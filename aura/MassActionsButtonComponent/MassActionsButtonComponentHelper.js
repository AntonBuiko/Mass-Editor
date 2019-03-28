({
    delete : function(component, massActionEvent) {
        var action= component.get("c.deleteRecords");
        action.setParams({
            'records' : component.get("v.selectedRows")
        });
        action.setCallback(this,function(response){
            if(state === "SUCCESS"){
                massActionEvent.fire();
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                massActionEvent.setParam("message", errors[0].message);
                massActionEvent.fire();
            }
        });
        $A.enqueueAction(action);
    }
})
