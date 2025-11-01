import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/utilities.css'

Vue.config.productionTip = false

let collectionsCache = null;

async function fetchCollectionsData() {
  if (collectionsCache) {
    return collectionsCache;
  }

  try {
    const response = await fetch('http://localhost:3000')
    if (response.ok) {
      const data = await response.json()
      collectionsCache = data
      return collectionsCache
    }
  } catch (e) {
    console.error(e)
  }
}

export async function getDictionaries(params = {}) {
  const collectionsData = await fetchCollectionsData();
  const dictionaries = [];
  const collectionNames = ['NSI_21', 'NSI_26', 'NSI_27', 'NSI_47', 'NSI_54'];

  collectionNames.forEach(collectionName => {
    const collection = collectionsData[collectionName];
    if (collection && collection.length > 0) {
      const metaDoc = collection.find(doc => doc.meta === 'meta');
      if (metaDoc) {
        dictionaries.push({
          _id: collectionName,
          code: metaDoc.code,
          name: metaDoc.name,
          type: metaDoc.type,
          startDate: metaDoc.start_date,
          endDate: metaDoc.end_date
        });
      }
    }
  });

  let filtered = [...dictionaries];
  if (params.type) {
    filtered = filtered.filter(d => d.type === params.type);
  }
  if (params.name) {
    filtered = filtered.filter(d => d.name.toLowerCase().includes(params.name.toLowerCase()));
  }
  if (params.code) {
    filtered = filtered.filter(d => d.code.toLowerCase().includes(params.code.toLowerCase()));
  }

  const page = params.page || 1;
  const limit = params.limit || 4;
  const skip = (page - 1) * limit;
  const paginated = filtered.slice(skip, skip + limit);

  return {
    items: paginated,
    pagination: {
      current: parseInt(page, 10),
      total: Math.ceil(filtered.length / limit),
      count: filtered.length,
      limit: parseInt(limit, 10)
    }
  };
}

export async function getDictionaryById(id) {
  const collectionsData = await fetchCollectionsData();
  const collection = collectionsData[id];
  if (!collection || collection.length === 0) throw new Error('Справочник не найден');

  const metaDoc = collection.find(doc => doc.meta === 'meta');
  if (!metaDoc) throw new Error('Метаданные не найдены');

  return {
    _id: id,
    code: metaDoc.code,
    name: metaDoc.name,
    type: metaDoc.type,
    startDate: metaDoc.start_date,
    endDate: metaDoc.end_date
  };
}

export async function getDictionaryItems(id, params = {}) {
  const collectionsData = await fetchCollectionsData();
  const collection = collectionsData[id];
  if (!collection) throw new Error('Справочник не найден');

  const allItems = collection
    .filter(doc => doc.meta !== 'meta')
    .map(item => ({
      _id: item._id ? item._id.toString() : Math.random().toString(),
      code: item.code,
      ruName: item.ru_name || '',
      rbName: item.rb_name || '',
      startDate: item['Дата от'] || '',
      endDate: item['Дата до'] || '',
      status: 'Активный'
    }));

  let filtered = [...allItems];
  if (params.code) {
    filtered = filtered.filter(item => item.code.toString().toLowerCase().includes(params.code.toLowerCase()));
  }
  if (params.ruName) {
    filtered = filtered.filter(item => item.ruName.toLowerCase().includes(params.ruName.toLowerCase()));
  }
  if (params.status) {
    filtered = filtered.filter(item => item.status === params.status);
  }

  const page = params.page || 1;
  const limit = params.limit || 10;
  const skip = (page - 1) * limit;
  const paginated = filtered.slice(skip, skip + limit);

  return {
    items: paginated,
    pagination: {
      current: parseInt(page, 10),
      total: Math.ceil(filtered.length / limit),
      count: filtered.length,
      limit: parseInt(limit, 10)
    }
  };
}

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')