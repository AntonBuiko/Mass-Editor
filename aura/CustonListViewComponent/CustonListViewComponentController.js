({
    handleRowSelection  : function(component, event, helper) {
        component.set("v.selectedRows", event.getParam('selectedRows'));
    },
    handleMassActionEvent : function(component, event, helper) {
        console.log(event.getParam("message"));
        if (event.getParam("message") !== undefined) {
            helper.handleShowNotice(component, event.getParam("message"));
        }
        else{
            var sObjName = component.get('v.sObject')
            helper.handleChangeSelect(component, sObjName);
            helper.handleShowToast(component);
        }
    },
    selectedsObjectChange : function(component, event, helper) {
        component.set("v.tableData", []);
        var sObjName = event.getParam("value");
        helper.handleChangeSelect(component, sObjName);
    }
})
