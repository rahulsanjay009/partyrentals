import { IonCard, IonCardContent, IonItem, IonLabel, IonText } from "@ionic/react"
import IonIcon from '@reacticons/ionicons'


const MobileContactUs = () => {
    return (
        <>
            <IonItem>
                <IonLabel style={{textAlign:'center'}}>Contact Us</IonLabel>                
            </IonItem>
            <div className='ion_contact_us'>
                <a href="https://api.whatsapp.com/send?phone=16692688087" target='_blank'><IonIcon name='logo-whatsapp' style={{height:'50px', width:'50px', color:'#25d366'}} /></a>
                <a href="https://www.instagram.com/skprllc/" target='_blank' style={{color:'black'}}><IonIcon name='logo-instagram' style={{height:'50px', width:'50px' }} /></a>
                <a href="mailto:srikrishnapartyrentals@gmail.com" style={{color:'#EA4335'}}><IonIcon name='mail-outline' style={{height:'50px', width:'50px' }} /></a>
            </div>               
            <div style={{padding:'15px', textAlign:'center'}}>
                <IonText> {'2619 Cordelia Ln, Tracy, CA 95377, United States.'} </IonText><br></br>
                <IonText> Contact: <a>{'(669) 268-8087'}</a>  </IonText>
            </div> 
        </>
    )
}

export default MobileContactUs