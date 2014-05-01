if (Meteor.isServer) {
  Meteor.startup(function () {
    function getTemplateRenderer(templateSource) {
      var renderCode = Spacebars.compile(templateSource, { isBody: true });
      var template = UI.Component.extend({
        kind: 'MainPage',
        render: eval(renderCode)
      });

      return function (data) {
        var instance = template.extend({
          data: data
        });

        return HTML.toHTML(instance.render(), instance);
      };
    }

    var ServerTemplates = {
      dailySchedule: getTemplateRenderer(Assets.getText("template.html"))
    };

    console.log(ServerTemplates.dailySchedule({
      items: ['Apples', 'Oranges', 'Bananas', 'Pineapples']
    }))
  });
}
