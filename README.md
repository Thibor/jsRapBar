# rapBar
Jquery clickable progress bar plugin can work also as slider.

More information about this can be found in this blog <a href="https://www.jqueryscript.net/loading/Dynamic-Progress-Bar-jsRapBar.html">article</a>.

#### Demo

[https://thibor.github.io/jsRapBar/](https://thibor.github.io/jsRapBar/) 

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
barColor | color | green | Bar color
backColor | color | white | Background color
enabled | bool | true | Enable disable plugin
position | double | 0 | Value of bar 0.0 - 1.0
width | size | '100%' | Plugin width
height | size | '16px' | Plugin height

### Events

Event | Params | Description
------ | ---- | -------
onClick | position | Fires after clik
onChange | position  | Fires when position is changed
