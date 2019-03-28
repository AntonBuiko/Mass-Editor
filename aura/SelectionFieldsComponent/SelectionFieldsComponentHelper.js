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
    }
})
