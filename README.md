### Instructions to Clone and Run the Server Side

1. **Clone the Repository**
    ```bash
    git clone https://github.com/MiM1303/techhive-server.git
    cd your-repo-name/server
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Set Up Environment Variables**
    - Create a `.env` file in the `server` directory and add the necessary environment variables:
        ```env
        PORT=your_port
        MONGODB_URI=your_mongodb_uri
        ```

4. **Run the Server**
    ```bash
    npm start
    ```

5. **Access the API**
    - After running the server, you can access the API endpoints at `http://localhost:5000` (or whatever port you define).
