({
	sortData: function (cmp, fieldName, sortDirection) {
        if(fieldName === 'linkName')
        {
        fieldName = 'Name';
        }
       	var data = cmp.get("v.accountList");
        var reverse = sortDirection !== 'asc';    
        data.sort(this.sortBy(fieldName, reverse))
        cmp.set("v.accountList", data);
    },
    
    sortBy: function (field, reverse) {
        var key = function(x) {return x[field]};
        reverse = !reverse ? 1 : -1;
        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    }
})