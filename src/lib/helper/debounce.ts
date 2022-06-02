export const debounce = function(func : Function, wait : number, immediate : boolean) {
	var timeout : any;
	return function() {
        //@ts-ignore
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};