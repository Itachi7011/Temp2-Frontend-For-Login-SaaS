import { useState, useEffect } from 'react';
import { useAuth } from 'authnest-react';

const ModalsTesting = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [modalsAvailable, setModalsAvailable] = useState(false);
    const { authStatus } = useAuth();

    useEffect(() => {
        const checkModalsAvailability = () => {
            const hasModals = !!(window.authnestModals && typeof window.authnestModals.show2FAModal === 'function');
            setModalsAvailable(hasModals);

            if (hasModals) console.log('✅ AuthNestModals from npm package is available');
            else console.log('❌ AuthNestModals not available');
        };

        checkModalsAvailability();
        const timeoutId = setTimeout(checkModalsAvailability, 1000);
        return () => clearTimeout(timeoutId);
    }, []);

    const testModal = async (modalType, modalName) => {
        if (!window.authnestModals) {
            setMessage('❌ AuthNest modals not loaded from npm package.');
            return;
        }

        setIsLoading(true);
        setMessage('');

        try {
            await window.authnestModals[modalType]({
                title: modalName,
                userContext: { reason: 'Testing modal functionality' }
            });
            setMessage(`✅ ${modalName} Successful!`);
        } catch (error) {
            setMessage(`❌ Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const test2FAModal = () => testModal('show2FAModal', '2FA Verification');
    const testPasswordModal = () => testModal('showPasswordConfirmModal', 'Password Confirmation');
    const testEmailModal = () => testModal('showEmailVerificationModal', 'Email Verification');

    const reloadPage = () => window.location.reload();

    const debugInfo = () => {
        console.log('🔍 Debug Info:', {
            authnest: window.authnest,
            authnestModals: window.authnestModals,
            AuthNestModalsClass: window.AuthNestModals,
            modalsAvailable,
            authStatus
        });
        setMessage('✅ Debug info logged to console');
    };

    if (authStatus.isLoading) {
        return (
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                padding: '40px 20px',
                fontFamily: 'Inter, Arial, sans-serif',
                color: '#f1f1f1',
                backgroundColor: '#121212',
                textAlign: 'center'
            }}>
                <h1 style={{ color: '#00bcd4' }}>AuthNest Modals Testing</h1>
                <div>Checking authentication status...</div>
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: '800px',
            margin: '40px auto',
            padding: '40px 20px',
            fontFamily: 'Inter, Arial, sans-serif',
            color: '#f1f1f1',
            backgroundColor: '#121212',
            borderRadius: '12px',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease-in-out'
        }}>
            <h1 style={{
                textAlign: 'center',
                color: '#00bcd4',
                marginBottom: '30px',
                letterSpacing: '0.5px'
            }}>AuthNest Modals Testing</h1>

            {/* Auth Status */}
            <div style={{
                padding: '20px',
                background: authStatus.isAuthenticated
                    ? 'linear-gradient(135deg, #1b5e20, #2e7d32)'
                    : 'linear-gradient(135deg, #b71c1c, #d32f2f)',
                borderRadius: '10px',
                marginBottom: '20px',
                boxShadow: '0 3px 10px rgba(0,0,0,0.2)'
            }}>
                <h3 style={{ marginBottom: '10px' }}>Authentication Status</h3>
                <p style={{ fontSize: '16px' }}>
                    {authStatus.isAuthenticated
                        ? '✅ Authenticated | Token stored in cookies'
                        : '❌ Not Authenticated'}
                </p>
            </div>

            {/* Package Status */}
            <div style={{
                padding: '20px',
                background: modalsAvailable
                    ? 'linear-gradient(135deg, #004d40, #00695c)'
                    : 'linear-gradient(135deg, #f57f17, #ff8f00)',
                borderRadius: '10px',
                marginBottom: '30px',
                boxShadow: '0 3px 10px rgba(0,0,0,0.2)'
            }}>
                <h3 style={{ marginBottom: '10px' }}>NPM Package Status</h3>
                <p>
                    {modalsAvailable
                        ? '✅ AuthNestModals Loaded - Ready for testing'
                        : '⚠️ AuthNestModals Not Loaded - Check console for details'}
                </p>

                {!modalsAvailable && (
                    <div style={{ marginTop: '15px' }}>
                        <button
                            onClick={reloadPage}
                            style={{
                                padding: '10px 18px',
                                backgroundColor: '#00bcd4',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                marginRight: '10px',
                                transition: '0.3s',
                                fontWeight: 600
                            }}
                        >
                            Reload Page
                        </button>
                        <button
                            onClick={debugInfo}
                            style={{
                                padding: '10px 18px',
                                backgroundColor: '#607d8b',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                transition: '0.3s',
                                fontWeight: 600
                            }}
                        >
                            Debug Info
                        </button>
                    </div>
                )}
            </div>

            {/* Modal Test Buttons */}
            <div style={{ marginBottom: '30px' }}>
                <h3 style={{ marginBottom: '10px' }}>Test Authentication Modals</h3>
                <p style={{ color: '#bbb' }}>
                    Each modal will verify your user token from cookies, then show the specific modal.
                </p>

                <div style={{
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap',
                    marginTop: '20px',
                    justifyContent: 'center'
                }}>
                    <button
                        onClick={test2FAModal}
                        disabled={isLoading || !authStatus.isAuthenticated || !modalsAvailable}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: (authStatus.isAuthenticated && modalsAvailable)
                                ? '#00bcd4' : '#444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: (authStatus.isAuthenticated && modalsAvailable)
                                ? 'pointer' : 'not-allowed',
                            fontWeight: 600,
                            transition: 'all 0.3s'
                        }}
                    >
                        Test 2FA Modal
                    </button>

                    <button
                        onClick={testPasswordModal}
                        disabled={isLoading || !authStatus.isAuthenticated || !modalsAvailable}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: (authStatus.isAuthenticated && modalsAvailable)
                                ? '#4caf50' : '#444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: (authStatus.isAuthenticated && modalsAvailable)
                                ? 'pointer' : 'not-allowed',
                            fontWeight: 600,
                            transition: 'all 0.3s'
                        }}
                    >
                        Test Password Modal
                    </button>

                    <button
                        onClick={testEmailModal}
                        disabled={isLoading || !authStatus.isAuthenticated || !modalsAvailable}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: (authStatus.isAuthenticated && modalsAvailable)
                                ? '#ffc107' : '#555',
                            color: 'black',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: (authStatus.isAuthenticated && modalsAvailable)
                                ? 'pointer' : 'not-allowed',
                            fontWeight: 600,
                            transition: 'all 0.3s'
                        }}
                    >
                        Test Email Modal
                    </button>
                </div>
            </div>

            {/* Status Message */}
            {message && (
                <div style={{
                    padding: '15px',
                    backgroundColor: message.includes('❌') ? '#b71c1c' : '#1b5e20',
                    borderRadius: '6px',
                    textAlign: 'center',
                    fontWeight: 500,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}>
                    {message}
                </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
                <div style={{
                    textAlign: 'center',
                    padding: '20px',
                    color: '#00bcd4',
                    fontWeight: 500,
                    letterSpacing: '0.5px'
                }}>
                    ⏳ Loading modal and verifying authentication...
                </div>
            )}
        </div>
    );
};

export default ModalsTesting;
