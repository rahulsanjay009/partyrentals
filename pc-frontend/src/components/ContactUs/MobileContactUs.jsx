import { IonItem, IonLabel, IonText } from "@ionic/react";
import IonIcon from '@reacticons/ionicons';

const MobileContactUs = () => {
    return (
        <>
            <IonItem lines="full">
                <IonLabel className="ion-text-center" style={{ fontWeight: 'bold', fontSize: '18px',textAlign:'center' }}>
                    Contact Us
                </IonLabel>
            </IonItem>

            <div className="ion_contact_us" style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                padding: '1rem'
            }}>
                <a
                    href="https://api.whatsapp.com/send?phone=16692688087"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                >
                    <IonIcon name="logo-whatsapp" style={{ height: '40px', width: '40px', color: '#25d366' }} />
                </a>
                <a
                    href="https://www.instagram.com/skprllc/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                >
                    <IonIcon name="logo-instagram" style={{ height: '40px', width: '40px', color: '#000' }} />
                </a>
                <a
                    href="mailto:srikrishnapartyrentals@gmail.com"
                    aria-label="Email"
                >
                    <IonIcon name="mail-outline" style={{ height: '40px', width: '40px', color: '#EA4335' }} />
                </a>
            </div>

            <div style={{ padding: '0 1rem 1rem', textAlign: 'center' }}>
                <IonText>
                    2619 Cordelia Ln, Tracy, CA 95377, United States.
                </IonText><br />
                <IonText>
                    Contact: <a href="tel:16692688087" style={{ color: '#2c7be5', textDecoration: 'none' }}>(669) 268-8087</a>
                </IonText>
            </div>
        </>
    );
};

export default MobileContactUs;
