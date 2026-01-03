// Paywall system - Premium content protection
(function () {
    'use strict';

    // Configuration
    const PAYWALL_KEY = 'HC{g4Hv1kqVI9PHeqqFEk2ciUMXjwM}';
    const STORAGE_KEY = 'hc_premium_access_token';

    // Check if user has premium access
    function hasPremiumAccess() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored === PAYWALL_KEY;
    }

    // Verify access key
    function verifyAccessKey(key) {
        if (key === PAYWALL_KEY) {
            localStorage.setItem(STORAGE_KEY, key);
            return true;
        }
        return false;
    }

    // Create paywall overlay
    function createPaywall() {
        const overlay = document.createElement('div');
        overlay.id = 'paywall-overlay';
        overlay.innerHTML = `
            <div class="paywall-content">
                <h2>Premium Content</h2>
                <p>This blog post is part of my premium content library.</p>
                <p>Support my work and get access to exclusive posts, project deep-dives, and early access to new tools.</p>
                <div class="paywall-form">
                    <input type="text" id="access-key-input" placeholder="Enter your access key" />
                    <button id="unlock-btn">Unlock Content</button>
                </div>
                <p class="paywall-hint">Already have an access key? Enter it above.</p>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            #paywall-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(5px);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .paywall-content {
                max-width: 500px;
                padding: 40px;
                text-align: center;
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            }

            .paywall-content h2 {
                margin-top: 0;
                color: #2c3e50;
            }

            .paywall-form {
                margin: 30px 0;
            }

            #access-key-input {
                width: 100%;
                padding: 12px;
                margin-bottom: 10px;
                border: 2px solid #ddd;
                border-radius: 4px;
                font-size: 14px;
            }

            #unlock-btn {
                width: 100%;
                padding: 12px;
                background: #3498db;
                color: white;
                border: none;
                border-radius: 4px;
                font-size: 16px;
                cursor: pointer;
                transition: background 0.2s;
            }

            #unlock-btn:hover {
                background: #2980b9;
            }

            .paywall-hint {
                font-size: 12px;
                color: #7f8c8d;
            }

            .paywall-error {
                color: #e74c3c;
                margin-top: 10px;
                font-size: 14px;
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(overlay);

        // Add event listener for unlock button
        document.getElementById('unlock-btn').addEventListener('click', function () {
            const input = document.getElementById('access-key-input');
            const key = input.value.trim();

            if (verifyAccessKey(key)) {
                removePaywall();
            } else {
                showError('Invalid access key. Please try again.');
            }
        });

        // Allow Enter key to submit
        document.getElementById('access-key-input').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                document.getElementById('unlock-btn').click();
            }
        });
    }

    function showError(message) {
        const existingError = document.querySelector('.paywall-error');
        if (existingError) {
            existingError.remove();
        }

        const error = document.createElement('p');
        error.className = 'paywall-error';
        error.textContent = message;
        document.querySelector('.paywall-form').appendChild(error);
    }

    function removePaywall() {
        const overlay = document.getElementById('paywall-overlay');
        if (overlay) {
            overlay.remove();
        }
    }

    // Initialize paywall on page load
    function init() {
        if (!hasPremiumAccess()) {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', createPaywall);
            } else {
                createPaywall();
            }
        }
    }

    init();
})();
