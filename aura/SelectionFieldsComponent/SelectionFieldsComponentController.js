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
                helper.setDualListBoxValues(component, mapObjAndFields, keys[0]);
                helper.getMapValueAndLabels(component);
                helper.setDataTableFields(component, component.get('v.fieldSelected'));
                component.set("v.sObjectTypes", keys);
                component.set("v.sObject", keys[0]);
                //helper.setDataTableRecords(component, keys[0], component.get('v.fieldOptions'));
            } 
        });
        $A.enqueueAction(action);
    },
    handleChangeSelectValue : function(component, event, helper) {
        component.set("v.columns", []);
        var sObject = component.get('v.selectedValue');
        let mapObjAndFields = component.get("v.mapObjAndFields");
        helper.setDualListBoxValues(component, mapObjAndFields, sObject);
        helper.getMapValueAndLabels(component);
        helper.setDataTableFields(component, component.get('v.fieldSelected'));
        component.set("v.sObject", sObject);
    },
    handleChangeField : function(component, event, helper) {
        let fields = event.getParam("value");
        helper.setDataTableFields(component, fields);
    }
})
