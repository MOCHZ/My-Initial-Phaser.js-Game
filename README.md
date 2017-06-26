# [My Initial Phaser.js Game][10]

## This project

This project was created simply to test the [Phaser.js][1] game engine.
All the character sprites were collected at [Spriters Resource][2], and belong to the creators of [Spelunky][3].The background 
Music was created by [BoxCat Games][4], and sound effects were collected from [Freesound.org][5].

If you want to see the project in action rather than downloading/cloning/forking it, please visit the project [here][10] 

## Requirements

To build and run this locally you need to install [Node.js][6], [Gulp][7] and [Bower][8].
After installing the required packages run the following commands to make the project run on your [localhost][9]:

    npm i
    bower install
    gulp
    gulp serve

## The Game Configuration
To swap between the available sprites in the code please change the character name in **app/scripts/states/game.js** 
on line 53. The following names are currently available:

    blue
    cyan
    cyclops
    eskimo
    golden_monk
    green
    hired_hand
    jungle_warrior
    lime
    meat_boy
    ninja
    purple
    red
    robot
    round_boy
    round_girl
    spelunky
    van_helsing
    viking
    yang
    yellow

## The Code

Please note that I have broken most coding conventions while writing this game, it is not suitable for anything more than
learning and understanding the basics of a side scrolling game . 
I would not recommend my approach or coding style for a final product!

[1]: http://www.phaser.io
[2]: https://www.spriters-resource.com/pc_computer/spelunky/
[3]: http://www.spelunkyworld.com/
[4]: http://box-cat.com
[5]: http://www.freesound.org
[6]: http://nodejs.org
[7]: http://gulpjs.com
[8]: https://bower.io
[9]: http://localhost:9000
[10]: http://initial.zorko.co