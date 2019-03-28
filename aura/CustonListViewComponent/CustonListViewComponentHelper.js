({
    handleShowNotice : function(component, message) {
        component.find('notifLib').showNotice({
            "variant": "error",
            "header": "Something has gone wrong!",
            "message": message
        });
    },
    handleShowToast : function(component) {
        component.find('notifLib').showToast({
            "title": "Operation success",
            "message": "success",
        });
    },
    handleChangeSelect : function(component, sObjName) {
        var fields = component.get('v.fieldOptions');
        var action= component.get("c.getRecords");
        let tableFields = fields[0].value;
        for(let i = 1; i < fields.length; i++){
            tableFields += ',' + fields[i].value;
        }
        action.setParams({
            'sObjName' : sObjName,
            'fields' : tableFields
        });
        action.setCallback(this,function(response){
            var state= response.getState();
            if(state === "SUCCESS"){
                component.set('v.allData',response.getReturnValue());
            } 
        });
        $A.enqueueAction(action);
    }
})
