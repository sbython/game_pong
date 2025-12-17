I. Gameplay and User Experience (Partial)

This section focuses on enhancing the core Pong gameplay and user interaction features, specifically for multiplayer and customization.

1. Major module: Remote players

    Objective: Enable two players to play remotely, each on a separate computer, accessing the same website and playing the same Pong game.

Key Consideration: You must offer the best user experience possible, considering network issues such as unexpected disconnections or lag.

2. Major module: Multiple players

    Objective: Make it possible to have more than two players in the same game.

Prerequisite: Live control for each player is required, making the "Remote players" module strongly recommended.

Design: It is up to you to define how the game will be played with 3,4,5,6 or more players.

    You must define a specific number of players, greater than 2, for this module (e.g., 4 players on a square board, each controlling one side).

3. Minor module: Game customization options

    Objective: Provide customization options for all available games on the platform.

Features:

    Offer customization features, such as power-ups, attacks, or different maps, that enhance the gameplay experience.

Allow users to choose a default version of the game with basic features if they prefer a simpler experience.

Implement user-friendly settings menus or interfaces for adjusting game parameters.

Maintain consistency in customization features across all games.

II. AI-Algo

This section is dedicated to introducing data-driven elements through an AI opponent and user statistics dashboards.

1. Major module: Introduce an AI opponent

    Objective: Incorporate an AI player into the game.

Key Constraint: The use of the A∗ algorithm is not permitted for this task.

Requirements:

    The AI must replicate human behavior by simulating keyboard input.

The AI can only refresh its view of the game once per second, requiring it to anticipate bounces and other actions.

The AI must utilize power-ups if the "Game customization options" module is implemented.

The AI must have the capability to win occasionally; creating an AI that does nothing is strictly prohibited.

You must explain in detail how your AI works during your evaluation.

All players, including the AI, must adhere to the same paddle speed.

2. Minor module: User and Game Stats Dashboards

    Objective: Introduce dashboards that display statistics for individual users and game sessions.

Features:

    Create user-friendly dashboards providing insights into gaming statistics.

Develop a separate dashboard for game sessions, showing detailed statistics, outcomes, and historical data for each match.

Implement data visualization techniques (charts/graphs).

Allow users to access and explore their own gaming history and performance metrics conveniently.

You are free to add any metrics you deem useful.

III. Graphics

This section focuses entirely on using advanced visual techniques for the Pong game.

1. Major module: Implementing Advanced 3D Techniques

    Objective: Enhance the visual aspects of the Pong game using advanced 3D techniques to create a more immersive gaming experience.

Technology Constraint: The Pong game must be developed using Babylon.js to achieve the desired visual effects.

Goal: The module aims to create stunning visual effects that immerse players in the gaming environment.

IV. Server-Side Pong

These modules are critical for establishing the game as a server-authoritative experience and enabling cross-platform play.

1. Major module: Replace Basic Pong with Server-Side Pong and Implementing an API

    Objective: Replace the basic Pong game with a server-side Pong game, accompanied by the implementation of an API.

Key Features:

    Develop server-side logic for the Pong game to handle gameplay, ball movement, scoring, and player interactions.

Create an API that exposes the necessary resources and endpoints (initialization, player controls, state updates) to interact with the game.

The API must allow partial usage of the game via both the Command-Line Interface (CLI) and the web interface.

Integrate the server-side Pong game with the web application for on-website play.

2. Major module: Enabling Pong Gameplay via CLI against Web Users with API Integration

    Objective: Develop a Command-Line Interface (CLI) that allows users to play Pong against players using the web version of the game.

Recommendation: Completing the previous module is strongly recommended.

Key Features:

    Create a robust CLI application that replicates the Pong gameplay experience.

Utilize the API to establish communication between the CLI and the web application.

Implement a user authentication mechanism within the CLI for secure login to the web application.

Implement real-time synchronization between the CLI and web users.

Enable CLI users to join and create Pong matches with web players, facilitating cross-platform gameplay.

V. General Constraints

    Prohibited Libraries: The use of libraries or tools that provide an immediate and complete solution for an entire feature or a module is prohibited.

Allowed Libraries: The use of a small library or tool that solves a simple, unique task representing a subcomponent of a larger feature or module is allowed.

Justification: The team must justify any use of a library or tool not explicitly approved by the project guidelines.

Security: If a backend is used, it is mandatory to enable an HTTPS connection for all aspects (use wss instead of ws for WebSockets).