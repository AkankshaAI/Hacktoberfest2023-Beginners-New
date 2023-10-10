<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Button Example</title>
    <style>
        
        .custom-button {
            background-color: #007bff;
            color: #fff;
            border: 2px solid #007bff;
            border-radius: 5px;
            padding: 15px 30px;
            cursor: pointer;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <h1>HTML Button Example</h1>
    
    <button>Click Me</button>

    <button onclick="alert('Button Clicked!')">Click Me with Alert</button>

    <button class="custom-button">Custom Button</button>

    <button id="myButton">Click Me</button>

    <script>
        document.getElementById("myButton").addEventListener("click", function() {
            alert("JavaScript Click Event!");
        });
    </script>
</body>
</html>
