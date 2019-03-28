({
    handleClickButton : function(component, event, helper) {
        var massActionEvent = component.getEvent("massActionEvent");
        var button = event.getSource();
        switch (button.get('v.name')) {
            case 'create':
              alert( 'Маловато' );
              break;
            case 'edit':
              alert( 'В точку!' );
              break;
            case 'delete':
              helper.delete(component, massActionEvent);
              break;
            case 'clone':
              alert( 'Перебор' );
              break;
            case 'import':
              alert( 'Перебор' );
              break;
            case 'export':
              alert( 'Перебор' );
              break;
            case 'pdf':
              alert( 'Перебор' );
              break;
          }
    }
})
