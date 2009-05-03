// Perl-like split
String.prototype.psplit = function(sep, limit) {
	var str = this+'', arg_limit = limit;
	if (typeof sep != 'string' && typeof sep != 'object'
		|| typeof sep == 'object' && (sep.constructor+'').match(/^\s*function\s+([\w$]+)/)[1] != 'RegExp')
			{ sep = sep+'' }

	if (typeof limit != 'number') limit = 0;
	if (limit == 1) return [str];
	else {
		var a = [], b = 0, c = 0, clear = false;
		if (typeof sep == 'string') {
			sep = sep.replace("\\", "\\\\");
			if (sep == ' ') sep = /\s+/, clear = true;
		}
		while (--limit) {
			if (!str || (b = str.search(sep)) == -1) break;
			a.push(str.substring(0, (c = RegExp.lastMatch.length) ? b : 1));
			str = str.substring(b + c || 1);
		}
		if (str || !a.length || arg_limit < 0) a.push(str);
		if (clear) for (var i = 0; i < a.length; i++) if (a[i] == '') a.splice(i, 1), i--;
		return a;
	}
};
