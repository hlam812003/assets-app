export const useAssetsStore = defineStore('assets', {
    state: () => ({
      assets: [],
    }),
  
    getters: {
      allAssets: (state) => state.assets,
    },
  
});