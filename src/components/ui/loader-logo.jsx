import React from 'react';
import "./loader-logo.css";

export function LoaderLogo() {
  return (
    <div className="loader-container">
      <div>
        <svg width="468" height="333" viewBox="0 0 468 333" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <style>
              {`
                .rect1, .rect2, .rect3 {
                  opacity: 0;
                  animation: fadeIn 4s linear infinite;
                }

                .rect1 {
                  animation-delay: 1s;
                }

                .rect2 {
                  animation-delay: 2s;
                }

                .rect3 {
                  animation-delay: 3s;
                }

                @keyframes fadeIn {
                  0%, 100% {
                    opacity: 0;
                  }
                  50% {
                    opacity: 1;
                  }
                }
              `}
            </style>
          </defs>

          <rect className="rect1" y="238" width="468" height="95" fill="#1167B9" />
          <rect className="rect2" y="119" width="214" height="95" fill="#147CC7" />
          <rect className="rect3" width="468" height="95" fill="#1895D4" />
        </svg>
      </div>
    </div>
  );
}

