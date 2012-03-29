(function() {
    var testRange = document.createElement('input');
    testRange.type = 'range';
    
    if (testRange.type !== 'range') {
        var inputs = document.getElementsByTagName('input'),
            ranges = [],
            i, il;
        
        for (i = 0, il = inputs.length; i < il; i++) {
            if (inputs[i].getAttribute('type') === 'range') {
                ranges.push(inputs[i]);
            }
        }
        
        for (i = 0, il = ranges.length; i < il; i++) {
            (function(i) {
                var range = ranges[i],
                    fakeRange = document.createElement('div'),
                    fakeRangeBackground = document.createElement('div'),
                    fakeRangeHandle = document.createElement('div'),
                    maxValue = range.getAttribute('max') || 100,
                    minValue = range.getAttribute('min') || 0,
                    stepValue = range.getAttribute('step') || 1,
                    startValue = range.getAttribute('value') || 0;
                    
                maxValue = parseInt(maxValue, 10);
                minValue = parseInt(minValue, 10);
                stepValue = parseInt(stepValue, 10);
                startValue = parseInt(startValue, 10);
                var prevValue = startValue;
    
                fakeRange.className = 'fakeRange';
                fakeRangeBackground.className = 'fakeRangeBackground';
                fakeRangeHandle.className = 'fakeRangeHandle';
                fakeRange.appendChild(fakeRangeBackground);
                fakeRange.appendChild(fakeRangeHandle);
                range.parentNode.insertBefore(fakeRange, range);
                range.disabled = 'disabled';
                range.style.display = 'none';
                fakeRange.style.position = 'relative';
                fakeRangeHandle.style.position = 'absolute';
                fakeRangeHandle.style.top = 0;
                fakeRangeBackground.style.position = 'absolute';
                fakeRangeBackground.style.top = 0;
                
                var handleWidth = fakeRangeHandle.offsetWidth,
                    rangeWidth = fakeRange.offsetWidth;
                
                var setValue = function(value) {
                    if (value > maxValue) {
                        value = maxValue;
                    } else if (value < minValue) {
                        value = minValue;
                    }
                    if ((value - minValue) % stepValue !== 0) {
                        value = (Math.round((value - minValue) / stepValue) * stepValue) + minValue;
                    }
                    var newPosition = ((value - minValue) / (maxValue - minValue)) * (rangeWidth - handleWidth);
                    fakeRangeHandle.style.left = newPosition + 'px';
                    fakeRangeBackground.style.width = (newPosition + handleWidth / 2) + 'px';
                    if (value !== prevValue) {
                        range.value = value;
                        var evt = document.createEvent('HTMLEvents');
                        evt.initEvent('change', true, true);
                        range.dispatchEvent(evt);
                        prevValue = value;
                    }
                };
                
                setValue(startValue);
                
                var events = ('ontouchstart' in document.createElement('div') ? 
                {
                    start: 'touchstart',
                    move: 'touchmove',
                    end: 'touchend'
                } : {
                    start: 'mousedown',
                    move: 'mousemove',
                    end: 'mouseup'
                });
                
                var updateValue = function(evt) {
                    if (evt.touches && evt.touches.length) {
                        evt = evt.touches[evt.touches.length - 1];
                    }
                    var x = evt.clientX - evt.target.offsetLeft;
                    if (evt.target.className !== 'fakeRange') {
                        x = evt.clientX - evt.target.parentNode.offsetLeft;
                    }
                    setValue(((x - handleWidth / 2) / (rangeWidth - handleWidth) * (maxValue - minValue)) + minValue);
                };
                
                fakeRange.addEventListener(events.start, function(evt) {
                    evt.preventDefault();
                    var currentEvt = evt;
                    var move = function(evt) {
                        currentEvt = evt;
                        evt.preventDefault();
                        updateValue(evt);
                    };
                    var end = function(evt) {
                        updateValue(currentEvt);
                        fakeRange.removeEventListener(events.move, move);
                        fakeRange.removeEventListener(events.end, end);
                    };
                    fakeRange.addEventListener(events.move, move, false);
                    fakeRange.addEventListener(events.end, end, false);
                }, false);
            }(i));
        }
    }
}());