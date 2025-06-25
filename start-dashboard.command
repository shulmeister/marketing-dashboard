#!/bin/bash
# Marketing Dashboard Launcher

echo "Starting Marketing Dashboard..."

# Navigate to the project directory
cd "/Users/jasonshulman/Marketing Dashboard"

# Start the development server and capture output
echo "Waiting for server to start..."
npm run dev > /tmp/dashboard.log 2>&1 &

# Wait for server to start
sleep 8

# Try to extract the port from the log
PORT=$(grep -o "localhost:[0-9]*" /tmp/dashboard.log | head -1 | cut -d: -f2)

if [ ! -z "$PORT" ]; then
    echo "Server detected on port $PORT"
    echo "Opening dashboard..."
    open "http://localhost:$PORT"
else
    echo "Checking common ports..."
    # Try common ports
    for port in 3000 3001 3002 3003 3004; do
        if curl -s "http://localhost:$port" > /dev/null; then
            echo "Opening dashboard on port $port..."
            open "http://localhost:$port"
            break
        fi
    done
fi

echo "Marketing Dashboard is now running!"
echo "If the browser didn't open, manually go to the URL shown above."
