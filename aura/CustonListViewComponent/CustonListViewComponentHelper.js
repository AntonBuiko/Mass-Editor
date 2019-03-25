({
    getMapValueAndLabels : function(component) {
        let options = component.get("v.fieldOptions");
        let mapValueAndLabel = new Map();
        for(let i = 0; i < options.length; i++){
            let valueField = options[i]["value"];
            let label = options[i]["label"];
            mapValueAndLabel.set(valueField, label);
        }
        component.set("v.mapValueAndLabel", mapValueAndLabel);
    },

    setDualListBoxValues : function(component, mapObjAndFields, key) {
        var fieldOptions = JSON.parse(mapObjAndFields[key]);
        fieldOptions = fieldOptions.sort(function(a, b){
            if(a.label < b.label) { return -1; }
            if(a.label > b.label) { return 1; }
            return 0;
        });
        var fieldSelected = [];
        if (fieldOptions.length > 10) {
            for (let i = 0; i < 10; i++) {
                fieldSelected.push(fieldOptions[i].value);
            }            
        }
        else{
            for (let i = 0; i < fieldOptions.length; i++) {
                fieldSelected.push(fieldOptions[i].value);
            } 
        }
        component.set("v.fieldOptions", fieldOptions);
        component.set("v.fieldSelected", fieldSelected);
    },

    setDataTableFields : function(component, fields) {
        let tableFields = [];
        for(let i = 0; i < fields.length; i++){
            let column = {
                label: component.get("v.mapValueAndLabel").get(fields[i]),
                fieldName: fields[i], 
                type: 'text'
            }
            if(!column.label.includes('ID')){
                column.editable = true;
            }
            tableFields.push(column);
        }
        component.set("v.columns", tableFields);
    },

    setDataTableRecords : function(component, sObjName, fields) {
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
                console.log(response.getReturnValue());
                component.set('v.allData',response.getReturnValue());
            } 
        });
        $A.enqueueAction(action);
    }
})
