export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About Electric Power",
      };
      return h.view("about-view", viewData);
    },
  },
};