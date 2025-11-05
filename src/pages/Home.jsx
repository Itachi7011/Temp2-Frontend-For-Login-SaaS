import { useNavigation } from 'authnest-react';

const HomePage = () => {
  const { loadingStates, handleNavigation, handleGetUserData } = useNavigation();

  const buttonConfigs = [
    {
      key: 'registration',
      title: 'Start Registration',
      description: 'Click the button below to proceed with registration',
      loadingText: 'Redirecting to registration portal...',
      handler: () => handleNavigation('registration', '/api/registrationLink')
    },
    {
      key: 'login',
      title: 'Start Login',
      description: 'Click the button below to proceed with login',
      loadingText: 'Redirecting to login portal...',
      handler: () => handleNavigation('login', '/api/loginLink')
    },
    {
      key: 'getUserData',
      title: 'Get Users List',
      description: 'Click to fetch user data using session ID',
      loadingText: 'Fetching user data...',
      handler: handleGetUserData
    },
    {
      key: 'userProfile',
      title: 'User Profile',
      description: 'Click to proceed with Getting User Profile Info',
      loadingText: 'Redirecting to user profile...',
      handler: () => handleNavigation('userProfile', '/api/userDataLink')
    },
    {
      key: 'clientProfile',
      title: 'Client Profile',
      description: 'Click to proceed with Getting Client Profile Info',
      loadingText: 'Redirecting to client profile...',
      handler: () => handleNavigation('clientProfile', '/api/clientDataLink')
    },
    {
      key: 'emailVerification',
      title: 'Email Verification',
      description: 'Click to proceed with Email Verification Link',
      loadingText: 'Redirecting to email verification...',
      handler: () => handleNavigation('emailVerification', '/api/emailVerificationLink')
    },
    {
      key: 'generalSettings',
      title: 'General Settings',
      description: 'Click to access General Settings',
      loadingText: 'Redirecting to general settings...',
      handler: () => handleNavigation('generalSettings', '/api/generalSettingsLink')
    },
    {
      key: 'securitySettings',
      title: 'Security Settings',
      description: 'Click to access Security Settings',
      loadingText: 'Redirecting to security settings...',
      handler: () => handleNavigation('securitySettings', '/api/securitySettingsLink')
    },
    {
      key: 'notificationsSettings',
      title: 'Notifications Settings',
      description: 'Click to access Notifications Settings',
      loadingText: 'Redirecting to notifications settings...',
      handler: () => handleNavigation('notificationsSettings', '/api/notificationsSettingsLink')
    }
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
        color: '#f0f0f0',
        fontFamily: 'Poppins, sans-serif',
        padding: '60px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '50px',
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '20px 40px',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
        }}
      >
        <h1
          style={{
            fontSize: '2.5rem',
            marginBottom: '10px',
            background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Account Portal
        </h1>
        <p
          style={{
            fontSize: '1.1rem',
            color: '#cfd8dc'
          }}
        >
          Manage your account settings and preferences
        </p>
      </div>

      {/* Buttons Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '25px',
          width: '100%',
          maxWidth: '1000px'
        }}
      >
        {buttonConfigs.map((config) => (
          <div
            key={config.key}
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              borderRadius: '16px',
              padding: '25px',
              textAlign: 'center',
              boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(8px)',
            }}
          >
            <h3
              style={{
                fontSize: '1.3rem',
                color: '#ffffff',
                marginBottom: '10px'
              }}
            >
              {config.title}
            </h3>
            <p
              style={{
                color: '#b0bec5',
                fontSize: '0.95rem',
                marginBottom: '20px',
                lineHeight: '1.4'
              }}
            >
              {config.description}
            </p>

            <button
              onClick={config.handler}
              disabled={loadingStates[config.key]}
              style={{
                padding: '12px 24px',
                background: loadingStates[config.key]
                  ? 'linear-gradient(90deg, #777, #999)'
                  : 'linear-gradient(90deg, #00c6ff, #0072ff)',
                color: '#fff',
                fontWeight: '600',
                border: 'none',
                borderRadius: '8px',
                cursor: loadingStates[config.key] ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {loadingStates[config.key] ? (
                <>
                  <span
                    style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid #fff',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      display: 'inline-block',
                      animation: 'spin 1s linear infinite'
                    }}
                  ></span>
                  {config.loadingText || 'Loading...'}
                </>
              ) : (
                config.title
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Inline Keyframes for Spinner */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
