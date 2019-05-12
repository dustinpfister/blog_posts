## level up

The idea here is that I just have a progress bar of sorts when it comes to continuing to work on writing more content for my site. To some extent it seems like this is like leveling up in a RPG style video game that involves grinding. As long as I just keep it up, eventually I will beat the game sort of speak.

```js
let getLevel = (state, cap) => {
    return [
        state.wc / cap.wc, // metric 1 (site wide word count)
        state.avgwc / cap.avgwc, // metric 2 (avg post word count)
        state.pc / cap.pc // metric 3 (post count);
    ].map(function (val) {
        return val > 1 ? 1 : val;
    }).reduce(function (acc, n) {
        return acc + n;
    }) / 3 * cap.level;
};

```