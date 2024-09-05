"use client";

import { createSocket } from "../_utils/socket";

export function TestButton() {
    return (
        <div>
            <button onClick={() => createSocket()}>Test Button</button>
        </div>
    )
}