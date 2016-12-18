"use strict";
var chai_1 = require('chai');
var events_1 = require('events');
var EventHelper_1 = require('../../../src/helpers/EventHelper');
describe('EventHelper', function () {
    describe('#addListeners()', function () {
        it('correctly adds listeners to an event emitter', function () {
            var eventEmitter = new events_1.EventEmitter();
            var pairs = [
                {
                    event: 'hello',
                    listener: function () { return true; },
                },
                {
                    event: 'world',
                    listener: function () { return true; },
                },
            ];
            EventHelper_1.EventHelper.addListeners(eventEmitter, pairs);
            chai_1.assert.deepEqual(eventEmitter.eventNames(), ['hello', 'world']);
        });
    });
    describe('#removeListeners()', function () {
        it('correctly removes listeners from an event emitter', function () {
            var eventEmitter = new events_1.EventEmitter();
            var pairs = [
                {
                    event: 'hello',
                    listener: function () { return true; },
                },
                {
                    event: 'world',
                    listener: function () { return true; },
                },
            ];
            EventHelper_1.EventHelper.addListeners(eventEmitter, pairs);
            chai_1.assert.deepEqual(eventEmitter.eventNames(), ['hello', 'world']);
            EventHelper_1.EventHelper.removeListeners(eventEmitter, pairs);
            chai_1.assert.equal(eventEmitter.eventNames().length, 0);
        });
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3Rlc3QvdW5pdC9oZWxwZXJzL0V2ZW50SGVscGVyVGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBUUEscUJBQXFCLE1BQU0sQ0FBQyxDQUFBO0FBQzVCLHVCQUEyQixRQUFRLENBQUMsQ0FBQTtBQUNwQyw0QkFBOEMsa0NBQWtDLENBQUMsQ0FBQTtBQUVqRixRQUFRLENBQUMsYUFBYSxFQUFFO0lBQ3BCLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtRQUN4QixFQUFFLENBQUMsOENBQThDLEVBQUU7WUFDL0MsSUFBSSxZQUFZLEdBQUcsSUFBSSxxQkFBWSxFQUFFLENBQUM7WUFDdEMsSUFBSSxLQUFLLEdBQXlCO2dCQUM5QjtvQkFDSSxLQUFLLEVBQUUsT0FBTztvQkFDZCxRQUFRLEVBQUUsY0FBTSxPQUFBLElBQUksRUFBSixDQUFJO2lCQUN2QjtnQkFDRDtvQkFDSSxLQUFLLEVBQUUsT0FBTztvQkFDZCxRQUFRLEVBQUUsY0FBTSxPQUFBLElBQUksRUFBSixDQUFJO2lCQUN2QjthQUNKLENBQUM7WUFDRix5QkFBVyxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDOUMsYUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNwRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0gsUUFBUSxDQUFDLG9CQUFvQixFQUFFO1FBQzNCLEVBQUUsQ0FBQyxtREFBbUQsRUFBRTtZQUNwRCxJQUFJLFlBQVksR0FBRyxJQUFJLHFCQUFZLEVBQUUsQ0FBQztZQUN0QyxJQUFJLEtBQUssR0FBeUI7Z0JBQzlCO29CQUNJLEtBQUssRUFBRSxPQUFPO29CQUNkLFFBQVEsRUFBRSxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUk7aUJBQ3ZCO2dCQUNEO29CQUNJLEtBQUssRUFBRSxPQUFPO29CQUNkLFFBQVEsRUFBRSxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUk7aUJBQ3ZCO2FBQ0osQ0FBQztZQUNGLHlCQUFXLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM5QyxhQUFNLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLHlCQUFXLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNqRCxhQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvdW5pdC9oZWxwZXJzL0V2ZW50SGVscGVyVGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGUgRXZlbXRIZWxwZXIgdGVzdHNcbiAqIEBhdXRob3IgVGltdXIgS3V6aGFnYWxpeWV2IDx0aW0ua3V6aEBnbWFpbC5jb20+XG4gKiBAY29weXJpZ2h0IDIwMTZcbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5cbmltcG9ydCB7YXNzZXJ0fSBmcm9tICdjaGFpJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdldmVudHMnO1xuaW1wb3J0IHtJRXZlbnRMaXN0ZW5lclBhaXIsIEV2ZW50SGVscGVyfSBmcm9tICcuLi8uLi8uLi9zcmMvaGVscGVycy9FdmVudEhlbHBlcic7XG5cbmRlc2NyaWJlKCdFdmVudEhlbHBlcicsICgpID0+IHtcbiAgICBkZXNjcmliZSgnI2FkZExpc3RlbmVycygpJywgKCkgPT4ge1xuICAgICAgICBpdCgnY29ycmVjdGx5IGFkZHMgbGlzdGVuZXJzIHRvIGFuIGV2ZW50IGVtaXR0ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZXZlbnRFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAgICAgbGV0IHBhaXJzOiBJRXZlbnRMaXN0ZW5lclBhaXJbXSA9IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiAnaGVsbG8nLFxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcjogKCkgPT4gdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6ICd3b3JsZCcsXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyOiAoKSA9PiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgRXZlbnRIZWxwZXIuYWRkTGlzdGVuZXJzKGV2ZW50RW1pdHRlciwgcGFpcnMpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChldmVudEVtaXR0ZXIuZXZlbnROYW1lcygpLCBbJ2hlbGxvJywgJ3dvcmxkJ10pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnI3JlbW92ZUxpc3RlbmVycygpJywgKCkgPT4ge1xuICAgICAgICBpdCgnY29ycmVjdGx5IHJlbW92ZXMgbGlzdGVuZXJzIGZyb20gYW4gZXZlbnQgZW1pdHRlcicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBldmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgICAgICBsZXQgcGFpcnM6IElFdmVudExpc3RlbmVyUGFpcltdID0gW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6ICdoZWxsbycsXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyOiAoKSA9PiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBldmVudDogJ3dvcmxkJyxcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXI6ICgpID0+IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBFdmVudEhlbHBlci5hZGRMaXN0ZW5lcnMoZXZlbnRFbWl0dGVyLCBwYWlycyk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKGV2ZW50RW1pdHRlci5ldmVudE5hbWVzKCksIFsnaGVsbG8nLCAnd29ybGQnXSk7XG4gICAgICAgICAgICBFdmVudEhlbHBlci5yZW1vdmVMaXN0ZW5lcnMoZXZlbnRFbWl0dGVyLCBwYWlycyk7XG4gICAgICAgICAgICBhc3NlcnQuZXF1YWwoZXZlbnRFbWl0dGVyLmV2ZW50TmFtZXMoKS5sZW5ndGgsIDApO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl19
