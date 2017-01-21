"use strict";
var chai_1 = require("chai");
var events_1 = require("events");
var EventHelper_1 = require("../../../src/helpers/EventHelper");
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
            chai_1.assert.equal(eventEmitter.listenerCount('hello'), 0);
            chai_1.assert.equal(eventEmitter.listenerCount('world'), 0);
            EventHelper_1.EventHelper.addListeners(eventEmitter, pairs);
            chai_1.assert.equal(eventEmitter.listenerCount('hello'), 1);
            chai_1.assert.equal(eventEmitter.listenerCount('world'), 1);
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
            chai_1.assert.equal(eventEmitter.listenerCount('hello'), 1);
            chai_1.assert.equal(eventEmitter.listenerCount('world'), 1);
            EventHelper_1.EventHelper.removeListeners(eventEmitter, pairs);
            chai_1.assert.equal(eventEmitter.listenerCount('hello'), 0);
            chai_1.assert.equal(eventEmitter.listenerCount('world'), 0);
        });
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3Rlc3QvdW5pdC9oZWxwZXJzL0V2ZW50SGVscGVyVGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBUUEsNkJBQTRCO0FBQzVCLGlDQUFvQztBQUNwQyxnRUFBaUY7QUFFakYsUUFBUSxDQUFDLGFBQWEsRUFBRTtJQUNwQixRQUFRLENBQUMsaUJBQWlCLEVBQUU7UUFDeEIsRUFBRSxDQUFDLDhDQUE4QyxFQUFFO1lBQy9DLElBQUksWUFBWSxHQUFHLElBQUkscUJBQVksRUFBRSxDQUFDO1lBQ3RDLElBQUksS0FBSyxHQUF5QjtnQkFDOUI7b0JBQ0ksS0FBSyxFQUFFLE9BQU87b0JBQ2QsUUFBUSxFQUFFLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSTtpQkFDdkI7Z0JBQ0Q7b0JBQ0ksS0FBSyxFQUFFLE9BQU87b0JBQ2QsUUFBUSxFQUFFLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSTtpQkFDdkI7YUFDSixDQUFDO1lBQ0YsYUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JELGFBQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyRCx5QkFBVyxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDOUMsYUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JELGFBQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0gsUUFBUSxDQUFDLG9CQUFvQixFQUFFO1FBQzNCLEVBQUUsQ0FBQyxtREFBbUQsRUFBRTtZQUNwRCxJQUFJLFlBQVksR0FBRyxJQUFJLHFCQUFZLEVBQUUsQ0FBQztZQUN0QyxJQUFJLEtBQUssR0FBeUI7Z0JBQzlCO29CQUNJLEtBQUssRUFBRSxPQUFPO29CQUNkLFFBQVEsRUFBRSxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUk7aUJBQ3ZCO2dCQUNEO29CQUNJLEtBQUssRUFBRSxPQUFPO29CQUNkLFFBQVEsRUFBRSxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUk7aUJBQ3ZCO2FBQ0osQ0FBQztZQUNGLHlCQUFXLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM5QyxhQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckQsYUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JELHlCQUFXLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNqRCxhQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckQsYUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3pELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3VuaXQvaGVscGVycy9FdmVudEhlbHBlclRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlIEV2ZW10SGVscGVyIHRlc3RzXG4gKiBAYXV0aG9yIFRpbXVyIEt1emhhZ2FsaXlldiA8dGltLmt1emhAZ21haWwuY29tPlxuICogQGNvcHlyaWdodCAyMDE2XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuXG5pbXBvcnQge2Fzc2VydH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnZXZlbnRzJztcbmltcG9ydCB7SUV2ZW50TGlzdGVuZXJQYWlyLCBFdmVudEhlbHBlcn0gZnJvbSAnLi4vLi4vLi4vc3JjL2hlbHBlcnMvRXZlbnRIZWxwZXInO1xuXG5kZXNjcmliZSgnRXZlbnRIZWxwZXInLCAoKSA9PiB7XG4gICAgZGVzY3JpYmUoJyNhZGRMaXN0ZW5lcnMoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ2NvcnJlY3RseSBhZGRzIGxpc3RlbmVycyB0byBhbiBldmVudCBlbWl0dGVyJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGV2ZW50RW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgICAgIGxldCBwYWlyczogSUV2ZW50TGlzdGVuZXJQYWlyW10gPSBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBldmVudDogJ2hlbGxvJyxcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXI6ICgpID0+IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiAnd29ybGQnLFxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcjogKCkgPT4gdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGFzc2VydC5lcXVhbChldmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCgnaGVsbG8nKSwgMCk7XG4gICAgICAgICAgICBhc3NlcnQuZXF1YWwoZXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQoJ3dvcmxkJyksIDApO1xuICAgICAgICAgICAgRXZlbnRIZWxwZXIuYWRkTGlzdGVuZXJzKGV2ZW50RW1pdHRlciwgcGFpcnMpO1xuICAgICAgICAgICAgYXNzZXJ0LmVxdWFsKGV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50KCdoZWxsbycpLCAxKTtcbiAgICAgICAgICAgIGFzc2VydC5lcXVhbChldmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCgnd29ybGQnKSwgMSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCcjcmVtb3ZlTGlzdGVuZXJzKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdjb3JyZWN0bHkgcmVtb3ZlcyBsaXN0ZW5lcnMgZnJvbSBhbiBldmVudCBlbWl0dGVyJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGV2ZW50RW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgICAgIGxldCBwYWlyczogSUV2ZW50TGlzdGVuZXJQYWlyW10gPSBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBldmVudDogJ2hlbGxvJyxcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXI6ICgpID0+IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiAnd29ybGQnLFxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcjogKCkgPT4gdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIEV2ZW50SGVscGVyLmFkZExpc3RlbmVycyhldmVudEVtaXR0ZXIsIHBhaXJzKTtcbiAgICAgICAgICAgIGFzc2VydC5lcXVhbChldmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCgnaGVsbG8nKSwgMSk7XG4gICAgICAgICAgICBhc3NlcnQuZXF1YWwoZXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQoJ3dvcmxkJyksIDEpO1xuICAgICAgICAgICAgRXZlbnRIZWxwZXIucmVtb3ZlTGlzdGVuZXJzKGV2ZW50RW1pdHRlciwgcGFpcnMpO1xuICAgICAgICAgICAgYXNzZXJ0LmVxdWFsKGV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50KCdoZWxsbycpLCAwKTtcbiAgICAgICAgICAgIGFzc2VydC5lcXVhbChldmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCgnd29ybGQnKSwgMCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXX0=
