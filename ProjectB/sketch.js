<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bird Speak</title>
    <link rel="stylesheet" href="style1.css">
</head>
<body>
    <h1>What kind of bird speak do you mean?</h1>

    <div class="container">
        <div class="bird-section">
            <img id="bird-image" src="bird1.png" alt="Bird" class="bird">
            <p class="bird-speak">BIRD SPEAK</p>
            <p id="change-dialect" class="change-dialect">Change Dialect</p>
            <a href="https://xeno-canto.org/" class="database-link" target="_blank">Link to the Database</a>

            <div class="speak-bubble" onclick="playSound('birdsampleA.mp3')">
                Bubble 1
                <a href="javascript:void(0);" class="sound-link" aria-label="Play Sound"></a>
            </div>
            <div class="speak-bubble" onclick="playSound('birdsampleB.mp3')">
                Bubble 2
                <a href="javascript:void(0);" class="sound-link" aria-label="Play Sound"></a>
            </div>
            <div class="speak-bubble" onclick="playSound('birdsampleC.mp3')">
                Bubble 3
                <a href="javascript:void(0);" class="sound-link" aria-label="Play Sound"></a>
            </div>
        </div>

        <div class="human-section">
            <p class="human-tounge">HUMAN TOUNGE</p>
            <div id="p5-container"></div>
            <input type="text" id="user-input" placeholder="Type here...">
        </div>

        <div class="flower-section">
            <img src="flower.png" alt="Flower" class="flower">
        </div>
    </div>

    <script>
        function playSound(file) {
            let audio = new Audio(file);
            audio.play();
        }
    </script>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
    <script src="sketch.js"></script>
</body>
</html>
