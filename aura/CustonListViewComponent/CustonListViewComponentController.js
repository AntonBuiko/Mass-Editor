({
    doInit : function(component, event, helper) {
        var action= component.get("c.getSObjectsTypes");
        action.setCallback(this,function(response){
            var state= response.getState();
            if(state === "SUCCESS"){
                let mapObjAndFields = response.getReturnValue();
                component.set("v.mapObjAndFields", mapObjAndFields);
                let keys = Object.keys(mapObjAndFields).sort(function(a, b){
                    if(a < b) { return -1; }
                    if(a > b) { return 1; }
                    return 0;
                });
                component.set("v.sObjectTypes", keys);
                component.set("v.selectedValue", keys[0]);
                helper.setDualListBoxValues(component, mapObjAndFields, keys[0]);
                helper.getMapValueAndLabels(component);
                helper.setDataTableFields(component, component.get('v.fieldSelected'));
                helper.setDataTableRecords(component, keys[0], component.get('v.fieldOptions'));
            } 
        });
        $A.enqueueAction(action);
    },
    changeSelectValue : function(component, event, helper) {
        component.set("v.columns", []);
        component.set("v.tableData", []);
        let sObject =  component.get("v.selectedValue");
        let mapObjAndFields = component.get("v.mapObjAndFields");
        helper.setDualListBoxValues(component, mapObjAndFields, sObject);
        helper.getMapValueAndLabels(component);
        helper.setDataTableFields(component, component.get('v.fieldSelected'));
        helper.setDataTableRecords(component, sObject, component.get('v.fieldOptions'));
    },
    handleChangeField : function(component, event, helper) {
        let fields = event.getParam("value");
        helper.setDataTableFields(component, fields);
    },
    handleRowSelection  : function(component, event, helper) {
        component.set("v.selectedRows", event.getParam('selectedRows'));
    },
    
    handleClickButton : function(component, event, helper) {
        var action= component.get("c.deleteRecords");
        action.setParams({
            'records' : component.get("v.selectedRows")
        });
        action.setCallback(this,function(response){
            var state= response.getState();
            console.log(state);
            if(state === "SUCCESS"){
                helper.setDataTableRecords(
                    component, 
                    component.get('v.selectedValue'),
                    component.get('v.fieldOptions'));
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                console.log(errors[0]);
                component.set("v.showErrors",true);
                component.set("v.errorMessage",errors[0].message);
                console.log(component.get("v.showErrors"));
                console.log(component.get("v.errorMessage"));
            }
        });
        $A.enqueueAction(action);
    },

    closeErrorMessage : function(component, event, helper) {
        component.set("v.showErrors", false);
    }
})
