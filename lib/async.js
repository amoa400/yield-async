/**
 * async function for es6 generator
 *
 * @param {Generator} generator function
 */
module.exports = function(func, args, callback) {
	if (typeof args === 'function') {
		callback = args;
		args = [];
	}
	args = args || [];
	callback = callback || function() {};

	// resume function
	var resume = function(err) {
		// catch error
		if (err) {
			process.nextTick(function() {
				try {
					var res = generator.throw(err);
				}
				catch(e) {
					callback(e);
					return;
				}
				
				// done
				if (res.done) {
					callback(null, res.value);
				}
			});
			return;
		}

		// next data
		var nextData = Array.prototype.slice.call(arguments, 1);
		if (nextData.length === 0) {
			nextData = undefined;
		}
		else
		if (nextData.length === 1) {
			nextData = nextData[0];
		}

		// run next
		process.nextTick(function() {
			try {
				var res = generator.next(nextData);
			}
			catch (e) {
				callback(e);
				return;
			}

			// done
			if (res.done) {
				callback(null, res.value);
			}
		});
	}

	// run
	args.push(resume);
	var generator = func.apply(this, args);
	resume();
}
