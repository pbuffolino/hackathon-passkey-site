'use client';

import { useState } from 'react';
import { decode } from 'cbor-x';

type Step = {
  id: number;
  title: string;
  explanation: string;
  visual: 'button' | 'biometric' | 'keygen' | 'publickey' | 'success' | 'validation';
};

type TechnicalMetadata = {
  credentialId: string;
  fullCredentialId: string;
  attestationFormat: string;
  hardwareType: string;
  transports: string[];
  algorithm: string;
  userVerification: string;
  authenticatorAttachment: string;
  attestationConveyancePreference: string;
};

type WebAuthnState = {
  status: 'idle' | 'creating' | 'success' | 'error';
  credentialId?: string;
  errorMessage?: string;
  technicalMetadata?: TechnicalMetadata;
};

type ValidationState = {
  status: 'idle' | 'verifying' | 'authenticated' | 'failed';
  errorMessage?: string;
};

const steps: Step[] = [
  {
    id: 1,
    title: 'Click to Get Started',
    explanation: 'When you click this button, your device starts creating a special passkey just for this website. Think of it like getting a new house key made, but this one is digital and unique to you.',
    visual: 'button',
  },
  {
    id: 2,
    title: 'Verify It\'s Really You',
    explanation: 'Your device will ask you to use your fingerprint, face, or device PIN, just like when you unlock your phone. This makes sure only you can create this passkey, even if someone else has your device.',
    visual: 'biometric',
  },
  {
    id: 3,
    title: 'Your Device Creates Your Secret Key',
    explanation: 'Your device creates a special secret key that stays on your device forever. It\'s stored in your device\'s secure chip, the same place that protects your Face ID or Touch ID. This secret never leaves your device.',
    visual: 'keygen',
  },
  {
    id: 4,
    title: 'The Website Gets a "Lock" (Not Your Key)',
    explanation: 'Your device sends the website something like a lock, but keeps the key to yourself. Anyone can see the lock, but only your device has the key that fits it. This way, the website can verify it\'s you without ever seeing your secret.',
    visual: 'publickey',
  },
  {
    id: 5,
    title: 'You\'re All Set!',
    explanation: 'That\'s it! Next time you want to log in, just use your fingerprint or face. No password needed. The website will recognize you using the "lock" it has, and your device will prove it\'s really you with your secret key.',
    visual: 'success',
  },
  {
    id: 6,
    title: 'Try Logging In',
    explanation: 'Let\'s test it! Click the button below to log in with your new passkey. You\'ll use your fingerprint or face again, and the system will make sure everything matches up correctly.',
    visual: 'validation',
  },
];

export default function PasskeyWalkthrough() {
  const [currentStep, setCurrentStep] = useState(0);
  const [webauthnState, setWebauthnState] = useState<WebAuthnState>({ status: 'idle' });
  const [validationState, setValidationState] = useState<ValidationState>({ status: 'idle' });
  const [showSimpleExplanation, setShowSimpleExplanation] = useState(true); // Default to simple mode for beginners
  const step = steps[currentStep];

  // Hard-coded challenge and user ID for demo
  const challenge = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10]);
  const userId = new Uint8Array([0x70, 0x61, 0x73, 0x73, 0x6b, 0x65, 0x79, 0x2d, 0x64, 0x65, 0x6d, 0x6f, 0x2d, 0x75, 0x73, 0x65, 0x72]);

  const handleCreatePasskey = async () => {
    // Check if WebAuthn is supported
    if (!window.PublicKeyCredential) {
      setWebauthnState({
        status: 'error',
        errorMessage: 'WebAuthn is not supported in this browser. Please use a modern browser that supports passkeys.',
      });
      return;
    }

    setWebauthnState({ status: 'creating' });

    try {
      const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
        challenge: challenge,
        rp: {
          name: 'Passkey Pilot',
          id: window.location.hostname,
        },
        user: {
          id: userId,
          name: 'Demo User',
          displayName: 'Demo User',
        },
        pubKeyCredParams: [
          {
            alg: -7, // ES256
            type: 'public-key',
          },
        ],
        authenticatorSelection: {
          authenticatorAttachment: 'platform',
          userVerification: 'required',
        },
        timeout: 60000,
        attestation: 'direct',
      };

      const credential = (await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions,
      })) as PublicKeyCredential;

      if (credential && credential.id) {
        // Save the full credential ID to localStorage
        localStorage.setItem('passkeyCredentialId', credential.id);
        
        // Shorten the credential ID for display (it's already base64url encoded)
        const fullId = credential.id;
        const shortenedId = fullId.length > 24 
          ? fullId.substring(0, 16) + '...' + fullId.slice(-8)
          : fullId;
        
        // Parse technical metadata from the response
        const response = credential.response as AuthenticatorAttestationResponse;
        let attestationFormat = 'Unknown';
        let hardwareType = 'Unknown';
        let transports: string[] = [];
        let algorithm = 'ES256 (-7)'; // Default to requested algorithm
        let userVerification = 'Unknown';
        let authenticatorAttachment = 'Unknown';
        let attestationConveyancePreference = publicKeyCredentialCreationOptions.attestation || 'none';

        // Get authenticator attachment from the credential
        if (credential.authenticatorAttachment) {
          authenticatorAttachment = credential.authenticatorAttachment;
        } else {
          // Fallback: try to infer from transports
          try {
            const transportsArray = response.getTransports();
            if (transportsArray && transportsArray.includes('internal')) {
              authenticatorAttachment = 'platform';
            } else {
              authenticatorAttachment = 'cross-platform';
            }
          } catch (error) {
            authenticatorAttachment = 'Unknown';
          }
        }

        try {
          // Parse attestation format and authenticator data from attestationObject
          if (response.attestationObject) {
            const attestationObj = decode(
              new Uint8Array(response.attestationObject)
            );
            
            if (attestationObj && attestationObj.fmt) {
              attestationFormat = attestationObj.fmt as string;
            }
            
            // Parse authenticator data (authData) to get flags
            if (attestationObj.authData) {
              const authData = attestationObj.authData as Uint8Array;
              
              // Read flags byte (byte 32 in authData, 0-indexed)
              // authData structure: rpIdHash (32 bytes) + flags (1 byte) + counter (4 bytes) + ...
              if (authData.length >= 33) {
                const flags = authData[32];
                const uv = (flags & 0x04) !== 0; // User Verification flag (bit 2)
                const up = (flags & 0x01) !== 0; // User Presence flag (bit 0)
                
                if (uv) {
                  userVerification = 'verified (biometric/PIN required)';
                } else if (up) {
                  userVerification = 'presence only (click to confirm)';
                } else {
                  userVerification = 'none';
                }
              }
              
              // Extract algorithm from COSE key in attestedCredentialData
              // The COSE key is in the credentialPublicKey field
              // Structure: credentialIdLength (2 bytes) + credentialId + credentialPublicKey (CBOR)
              try {
                // Skip rpIdHash (32) + flags (1) + signCount (4) = 37 bytes
                // Then credentialId length (2 bytes) + credentialId
                let offset = 37;
                if (authData.length > offset + 2) {
                  // Read credentialId length (big-endian)
                  const credIdLen = (authData[offset] << 8) | authData[offset + 1];
                  offset += 2 + credIdLen;
                  
                  // Now we should be at the credentialPublicKey (CBOR-encoded COSE key)
                  if (authData.length > offset) {
                    const coseKeyBytes = authData.slice(offset);
                    try {
                      const coseKey = decode(coseKeyBytes);
                      // COSE key structure: map with algorithm at key 3
                      if (coseKey && typeof coseKey === 'object' && 3 in coseKey) {
                        const alg = coseKey[3];
                        // Map common algorithm values (using number keys since COSE uses integers)
                        const algMap: { [key: number]: string } = {
                          [-7]: 'ES256',
                          [-35]: 'ES384',
                          [-36]: 'ES512',
                          [-257]: 'RS256',
                          [-37]: 'PS256',
                        };
                        if (typeof alg === 'number') {
                          algorithm = algMap[alg] ? `${algMap[alg]} (${alg})` : `Algorithm ${alg}`;
                        }
                      } else {
                        // If COSE key doesn't have algorithm, use requested algorithm
                        algorithm = 'ES256 (-7)';
                      }
                    } catch (error) {
                      // If COSE key parsing fails, use requested algorithm
                      algorithm = 'ES256 (-7)';
                    }
                  } else {
                    // Not enough data, use requested algorithm
                    algorithm = 'ES256 (-7)';
                  }
                } else {
                  // Not enough data, use requested algorithm
                  algorithm = 'ES256 (-7)';
                }
              } catch (error) {
                // Fallback to requested algorithm
                algorithm = 'ES256 (-7)';
              }
            }
          }
        } catch (error) {
          console.warn('Failed to parse attestation object:', error);
        }

        try {
          // Get hardware type from transports
          const transportsArray = response.getTransports();
          if (transportsArray && transportsArray.length > 0) {
            transports = transportsArray;
            if (transportsArray.length === 1) {
              switch (transportsArray[0]) {
                case 'internal':
                  hardwareType = 'Platform Biometrics';
                  break;
                case 'usb':
                  hardwareType = 'USB Security Key';
                  break;
                case 'nfc':
                  hardwareType = 'NFC Security Key';
                  break;
                case 'ble':
                  hardwareType = 'Bluetooth Security Key';
                  break;
                case 'hybrid':
                  hardwareType = 'Hybrid Authenticator';
                  break;
                default:
                  hardwareType = 'Unknown';
              }
            } else {
              hardwareType = 'Multi-Transport Authenticator';
            }
          } else {
            hardwareType = 'Unknown';
          }
        } catch (error) {
          console.warn('Failed to get transports:', error);
        }
        
        setWebauthnState({
          status: 'success',
          credentialId: shortenedId,
          technicalMetadata: {
            credentialId: shortenedId,
            fullCredentialId: fullId,
            attestationFormat,
            hardwareType,
            transports: transports.length > 0 ? transports : ['Not specified'],
            algorithm,
            userVerification,
            authenticatorAttachment,
            attestationConveyancePreference,
          },
        });
      }
    } catch (error: any) {
      // Handle user cancellation
      if (error.name === 'NotAllowedError' || error.name === 'AbortError') {
        setWebauthnState({
          status: 'error',
          errorMessage: 'Registration Cancelled - This is why Passkeys are secure; the user is always in control.',
        });
      } else {
        setWebauthnState({
          status: 'error',
          errorMessage: error.message || 'An error occurred during passkey creation.',
        });
      }
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStartOver = () => {
    setCurrentStep(0);
    setWebauthnState({ status: 'idle' });
    setValidationState({ status: 'idle' });
    setShowSimpleExplanation(true);
  };

  // Helper function to convert base64url to Uint8Array
  const base64UrlToUint8Array = (base64Url: string): BufferSource => {
    // Convert base64url to base64
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    // Add padding if needed
    while (base64.length % 4) {
      base64 += '=';
    }
    
    // Decode base64 to binary string, then convert to Uint8Array
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const handleVerifyPasskey = async () => {
    // Check if WebAuthn is supported
    if (!window.PublicKeyCredential) {
      setValidationState({
        status: 'failed',
        errorMessage: 'WebAuthn is not supported in this browser.',
      });
      return;
    }

    // Check if credential ID exists in localStorage
    const storedCredentialId = localStorage.getItem('passkeyCredentialId');
    if (!storedCredentialId) {
      setValidationState({
        status: 'failed',
        errorMessage: 'No passkey found. Please register a passkey first.',
      });
      return;
    }

    setValidationState({ status: 'verifying' });

    try {
      const credentialIdBytes = base64UrlToUint8Array(storedCredentialId);
      
      const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
        challenge: challenge,
        timeout: 60000,
        userVerification: 'required',
        allowCredentials: [
          {
            id: credentialIdBytes,
            type: 'public-key',
          },
        ],
      };

      const assertion = (await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions,
      })) as PublicKeyCredential;

      if (assertion && assertion.id) {
        // Compare the returned credential ID with the stored one
        if (assertion.id === storedCredentialId) {
          setValidationState({ status: 'authenticated' });
        } else {
          setValidationState({
            status: 'failed',
            errorMessage: 'Credential ID mismatch. Validation failed.',
          });
        }
      } else {
        setValidationState({
          status: 'failed',
          errorMessage: 'No credential returned. Validation failed.',
        });
      }
    } catch (error: any) {
      // Handle user cancellation or errors
      if (error.name === 'NotAllowedError' || error.name === 'AbortError') {
        setValidationState({
          status: 'failed',
          errorMessage: 'Validation cancelled by user.',
        });
      } else {
        setValidationState({
          status: 'failed',
          errorMessage: error.message || 'Validation failed. Please try again.',
        });
      }
    }
  };

  const renderVisual = () => {
    switch (step.visual) {
      case 'button':
        return (
          <div className="flex items-center justify-center h-full min-h-[300px]">
            <button
              className="px-8 py-4 bg-[#00D9FF] text-black font-semibold rounded-lg text-lg transition-all hover:bg-[#00B8D4] hover:scale-105 shadow-lg shadow-[#00D9FF]/30"
              onClick={handleNext}
            >
              Register Passkey
            </button>
          </div>
        );
      case 'biometric':
        return (
          <div className="flex flex-col items-center justify-center h-full min-h-[300px] space-y-4">
            {webauthnState.status === 'idle' && (
              <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-[#00D9FF]/20 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-[#00D9FF]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.78c.017-.23.032-.46.032-.701 0-4.97-4.03-9-9-9s-9 4.03-9 9c0 .241.015.471.032.701M12 11c0-3.517 1.009-6.799 2.753-9.571m3.44 2.78c-.017.23-.032.46-.032.701 0 4.97 4.03 9 9 9s9-4.03 9-9c0-.241-.015-.471-.032-.701M12 11a9 9 0 01-9 9m9-9a9 9 0 019 9m-9-9v.01M3 20v.01M21 20v.01"
                      />
                    </svg>
                  </div>
                  <p className="text-white text-lg font-medium mb-4">Ready to create your passkey</p>
                  <button
                    onClick={handleCreatePasskey}
                    className="px-6 py-3 bg-[#00D9FF] text-black font-semibold rounded-lg hover:bg-[#00B8D4] transition-colors shadow-lg shadow-[#00D9FF]/30"
                  >
                    Create Real Passkey
                  </button>
                </div>
              </div>
            )}

            {webauthnState.status === 'creating' && (
              <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-[#00D9FF]/20 flex items-center justify-center animate-pulse-slow">
                    <svg
                      className="w-12 h-12 text-[#00D9FF]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.78c.017-.23.032-.46.032-.701 0-4.97-4.03-9-9-9s-9 4.03-9 9c0 .241.015.471.032.701M12 11c0-3.517 1.009-6.799 2.753-9.571m3.44 2.78c-.017.23-.032.46-.032.701 0 4.97 4.03 9 9 9s9-4.03 9-9c0-.241-.015-.471-.032-.701M12 11a9 9 0 01-9 9m9-9a9 9 0 019 9m-9-9v.01M3 20v.01M21 20v.01"
                      />
                    </svg>
                  </div>
                  <p className="text-white text-lg font-medium">Identifying...</p>
                  <p className="text-gray-400 text-sm">Check your device for biometric prompt</p>
                </div>
              </div>
            )}

            {webauthnState.status === 'success' && (
              <div className="flex flex-col items-center space-y-4 w-full">
                <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-green-500/50 w-full">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg">
                      <p className="text-green-400 font-semibold text-lg">Real Passkey Created!</p>
                    </div>
                  </div>
                </div>
                {webauthnState.technicalMetadata && (
                  <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700 w-full">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-white font-semibold text-xl">What Just Happened?</h3>
                      <button
                        onClick={() => setShowSimpleExplanation(!showSimpleExplanation)}
                        className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors border border-gray-600 font-medium"
                      >
                        {showSimpleExplanation ? 'Show Technical Details' : 'Show Simple Explanation'}
                      </button>
                    </div>
                    
                    {showSimpleExplanation ? (
                      <div className="space-y-5">
                        <div className="p-5 bg-gray-900/50 rounded-lg border border-gray-700">
                          <p className="text-gray-300 text-sm mb-3 font-semibold uppercase tracking-wide">Credential ID</p>
                          <p className="text-[#00D9FF] font-mono text-base break-all mb-3">
                            {webauthnState.technicalMetadata.credentialId}
                          </p>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            A unique ID for this passkey. Think of it like a serial number. The website uses this to remember which passkey belongs to you.
                          </p>
                        </div>
                        
                        <div className="p-5 bg-gray-900/50 rounded-lg border border-gray-700">
                          <p className="text-gray-300 text-sm mb-3 font-semibold uppercase tracking-wide">Hardware Type</p>
                          <p className="text-white text-base mb-3 font-medium">
                            {webauthnState.technicalMetadata.hardwareType}
                          </p>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {webauthnState.technicalMetadata.hardwareType === 'Platform Biometrics' 
                              ? 'Your passkey is stored in your device\'s secure chip, the same technology that powers Touch ID or Face ID. It can only be used on this device, which makes it extra secure.'
                              : webauthnState.technicalMetadata.hardwareType === 'USB Security Key'
                              ? 'Your passkey is stored on a physical USB security key. You can plug it into any device to use your passkey, great for people who use multiple computers.'
                              : webauthnState.technicalMetadata.hardwareType === 'Multi-Transport Authenticator'
                              ? 'Your passkey can connect in multiple ways (USB, NFC tap, or Bluetooth), so you can use it with lots of different devices.'
                              : 'This shows how your device stores and uses your passkey.'}
                          </p>
                        </div>
                        
                        <div className="p-5 bg-gray-900/50 rounded-lg border border-gray-700">
                          <p className="text-gray-300 text-sm mb-3 font-semibold uppercase tracking-wide">User Verification</p>
                          <p className="text-white text-base mb-3 font-medium">
                            {webauthnState.technicalMetadata.userVerification.includes('verified')
                              ? 'Biometric Required'
                              : webauthnState.technicalMetadata.userVerification.includes('presence')
                              ? 'Click to Confirm'
                              : 'Not Specified'}
                          </p>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {webauthnState.technicalMetadata.userVerification.includes('verified')
                              ? 'This passkey requires your fingerprint, face, or device PIN every time you use it. This is the most secure option. Even if someone steals your device, they can\'t use your passkey without your biometric.'
                              : webauthnState.technicalMetadata.userVerification.includes('presence')
                              ? 'This passkey only requires you to click a button to confirm. No fingerprint or face needed. This is less secure but might be used for some older devices.'
                              : 'This shows how your device verifies it\'s really you when using the passkey.'}
                          </p>
                        </div>
                        
                        <div className="p-5 bg-gray-900/50 rounded-lg border border-gray-700">
                          <p className="text-gray-300 text-sm mb-3 font-semibold uppercase tracking-wide">Attestation Format</p>
                          <p className="text-white font-mono text-base mb-3 font-medium">
                            {webauthnState.technicalMetadata.attestationFormat}
                          </p>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            This is the technical format your device uses to prove it\'s legitimate. Different device makers (Apple, Google, Microsoft, etc.) use different formats, but they all provide the same level of security.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-5">
                        <div className="p-5 bg-gray-900/50 rounded-lg border border-gray-700">
                          <p className="text-gray-300 text-sm mb-2 font-semibold uppercase tracking-wide">Credential ID</p>
                          <p className="text-[#00D9FF] font-mono text-base break-all mb-3">
                            {webauthnState.technicalMetadata.credentialId}
                          </p>
                          <details className="mt-3">
                            <summary className="text-gray-400 text-sm cursor-pointer hover:text-gray-300 font-medium">
                              Show full ID
                            </summary>
                            <p className="text-[#00D9FF] font-mono text-sm break-all mt-3 p-3 bg-gray-800 rounded">
                              {webauthnState.technicalMetadata.fullCredentialId}
                            </p>
                          </details>
                        </div>
                        
                        <div className="p-5 bg-gray-900/50 rounded-lg border border-gray-700">
                          <p className="text-gray-300 text-sm mb-2 font-semibold uppercase tracking-wide">Attestation Format</p>
                          <p className="text-white font-mono text-base mb-3 font-medium">
                            {webauthnState.technicalMetadata.attestationFormat}
                          </p>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            The format identifier from the CBOR-encoded attestationObject. Common values: "packed", "tpm", "android-key", "apple", "none".
                          </p>
                        </div>
                        
                        <div className="p-5 bg-gray-900/50 rounded-lg border border-gray-700">
                          <p className="text-gray-300 text-sm mb-2 font-semibold uppercase tracking-wide">Hardware Type</p>
                          <p className="text-white text-base mb-2 font-medium">
                            {webauthnState.technicalMetadata.hardwareType}
                          </p>
                          <p className="text-gray-400 text-sm mb-3">
                            Derived from transport mechanisms: {webauthnState.technicalMetadata.transports.join(', ')}
                          </p>
                        </div>
                        
                        <div className="p-5 bg-gray-900/50 rounded-lg border border-gray-700">
                          <p className="text-gray-300 text-sm mb-2 font-semibold uppercase tracking-wide">Cryptographic Algorithm</p>
                          <p className="text-white font-mono text-base mb-3 font-medium">
                            {webauthnState.technicalMetadata.algorithm}
                          </p>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {webauthnState.technicalMetadata.algorithm.includes('ES256')
                              ? 'ES256 (Elliptic Curve Digital Signature Algorithm with P-256 and SHA-256). This is the standard algorithm used for WebAuthn credentials.'
                              : 'The cryptographic algorithm used for signing. Extracted from the COSE key in the attestation object.'}
                          </p>
                        </div>
                        
                        <div className="p-5 bg-gray-900/50 rounded-lg border border-gray-700">
                          <p className="text-gray-300 text-sm mb-2 font-semibold uppercase tracking-wide">User Verification</p>
                          <p className="text-white text-base mb-3 font-medium">
                            {webauthnState.technicalMetadata.userVerification}
                          </p>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {webauthnState.technicalMetadata.userVerification.includes('verified') 
                              ? 'Biometric authentication (fingerprint, face) or device PIN was required and verified during credential creation.'
                              : webauthnState.technicalMetadata.userVerification.includes('presence')
                              ? 'Only user presence (click/button press) was required - no biometric verification needed.'
                              : 'Indicates the level of user verification performed during credential creation.'}
                          </p>
                        </div>
                        
                        <div className="p-5 bg-gray-900/50 rounded-lg border border-gray-700">
                          <p className="text-gray-300 text-sm mb-2 font-semibold uppercase tracking-wide">Authenticator Attachment</p>
                          <p className="text-white text-base mb-3 font-medium">
                            {webauthnState.technicalMetadata.authenticatorAttachment}
                          </p>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            Platform authenticator means the passkey is bound to this device. Cross-platform would allow syncing across devices.
                          </p>
                        </div>
                        
                        <div className="p-5 bg-gray-900/50 rounded-lg border border-gray-700">
                          <p className="text-gray-300 text-sm mb-2 font-semibold uppercase tracking-wide">Attestation Conveyance</p>
                          <p className="text-white text-base mb-3 font-medium">
                            {webauthnState.technicalMetadata.attestationConveyancePreference}
                          </p>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            "Direct" means the full attestation statement is included, providing maximum information about the authenticator.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {webauthnState.status === 'error' && (
              <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-red-500/50">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <p className="text-red-400 font-medium text-center max-w-md">
                    {webauthnState.errorMessage}
                  </p>
                  <button
                    onClick={handleCreatePasskey}
                    className="px-6 py-3 bg-[#00D9FF] text-black font-semibold rounded-lg hover:bg-[#00B8D4] transition-colors shadow-lg shadow-[#00D9FF]/30 mt-2"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      case 'keygen':
        return (
          <div className="flex flex-col items-center justify-center h-full min-h-[300px] space-y-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#00B8D4] flex items-center justify-center animate-pulse-slow shadow-lg shadow-[#00D9FF]/50">
                <svg
                  className="w-16 h-16 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-black">
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-gray-300 text-sm">Your Secret Key</p>
              <div className="flex items-center space-x-2 justify-center">
                <div className="w-2 h-2 bg-[#00D9FF] rounded-full"></div>
                <p className="text-[#00D9FF] text-xs">Stays on your device forever</p>
              </div>
            </div>
          </div>
        );
      case 'publickey':
        return (
          <div className="flex flex-col items-center justify-center h-full min-h-[300px] space-y-6">
            <div className="flex items-center space-x-8">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-24 h-24 rounded-lg bg-gray-800 border-2 border-[#00D9FF] flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-[#00D9FF]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                </div>
                <p className="text-gray-400 text-xs">Your Device</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-0.5 bg-[#00D9FF]"></div>
                <svg
                  className="w-6 h-6 text-[#00D9FF] animate-pulse-slow"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                <div className="w-12 h-0.5 bg-[#00D9FF]"></div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-24 h-24 rounded-lg bg-gray-800 border-2 border-gray-600 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                </div>
                <p className="text-gray-400 text-xs">Website Server</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm text-center">Only the "lock" (public key) is shared with the website. Your "key" (private key) stays on your device.</p>
          </div>
        );
      case 'success':
        return (
          <div className="flex flex-col items-center justify-center h-full min-h-[300px] space-y-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/50">
              <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="text-center space-y-2">
              <p className="text-white text-2xl font-semibold">Passkey Created!</p>
              <p className="text-gray-400">You're ready to use biometric login</p>
            </div>
          </div>
        );
      case 'validation':
        return (
          <div className="flex flex-col items-center justify-center h-full min-h-[300px] space-y-4">
            {validationState.status === 'idle' && (
              <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-[#00D9FF]/20 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-[#00D9FF]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <p className="text-white text-lg font-medium mb-4">Ready to verify your passkey</p>
                  <button
                    onClick={handleVerifyPasskey}
                    className="px-6 py-3 bg-[#00D9FF] text-black font-semibold rounded-lg hover:bg-[#00B8D4] transition-colors shadow-lg shadow-[#00D9FF]/30"
                  >
                    Verify Passkey
                  </button>
                </div>
              </div>
            )}

            {validationState.status === 'verifying' && (
              <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-[#00D9FF]/20 flex items-center justify-center animate-pulse-slow">
                    <svg
                      className="w-12 h-12 text-[#00D9FF]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <p className="text-white text-lg font-medium">Verifying...</p>
                  <p className="text-gray-400 text-sm">Check your device for biometric prompt</p>
                </div>
              </div>
            )}

            {validationState.status === 'authenticated' && (
              <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-green-500/50">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse-slow">
                      <svg
                        className="w-16 h-16 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-green-500/30 animate-ping"></div>
                  </div>
                  <div className="px-6 py-3 bg-green-500/20 border border-green-500/50 rounded-lg">
                    <p className="text-green-400 font-semibold text-xl">Security Authenticated</p>
                  </div>
                  <p className="text-gray-300 text-sm text-center max-w-md">
                    Your passkey has been successfully verified. The credential ID matches!
                  </p>
                </div>
              </div>
            )}

            {validationState.status === 'failed' && (
              <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-red-500/50">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div className="px-6 py-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                    <p className="text-red-400 font-semibold text-lg">Validation Failed</p>
                  </div>
                  <p className="text-red-400 font-medium text-center max-w-md">
                    {validationState.errorMessage || 'Validation failed. Please try again.'}
                  </p>
                  <button
                    onClick={handleVerifyPasskey}
                    className="px-6 py-3 bg-[#00D9FF] text-black font-semibold rounded-lg hover:bg-[#00B8D4] transition-colors shadow-lg shadow-[#00D9FF]/30 mt-2"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Try It Yourself
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See how easy it is to create a passkey. Follow along step by step. It only takes a minute!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Visual Simulation */}
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 min-h-[400px] flex items-center justify-center">
            <div className="w-full animate-fade-in">
              {renderVisual()}
            </div>
          </div>

          {/* Educational Explanation Panel */}
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#00D9FF] text-black font-bold flex items-center justify-center">
                  {step.id}
                </div>
                <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                {step.explanation}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleStartOver}
                className="px-6 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
              >
                Start Over
              </button>
              {currentStep < steps.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-[#00D9FF] text-black font-semibold rounded-lg hover:bg-[#00B8D4] transition-colors shadow-lg shadow-[#00D9FF]/30"
                >
                  Next Step →
                </button>
              ) : (
                <button
                  onClick={handleStartOver}
                  className="px-8 py-3 bg-[#00D9FF] text-black font-semibold rounded-lg hover:bg-[#00B8D4] transition-colors shadow-lg shadow-[#00D9FF]/30"
                >
                  Try Again
                </button>
              )}
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center space-x-2">
              {steps.map((s, idx) => (
                <div
                  key={s.id}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    idx <= currentStep
                      ? 'bg-[#00D9FF]'
                      : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

