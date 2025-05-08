import { IonCard, IonCardContent, IonItem, IonLabel, IonLoading, IonText } from "@ionic/react";
import MobileCardCarousel from "../../Carousel/MobileCardCarousel";
import useCategories from "../../../utils/useCategories";
import CategoryImages from '../CategoryImages.json'
import { useNavigate } from "react-router-dom";
import useEvents from "../../../utils/useEvents";

const MobileHomeContent = () => {
    const {categories, loading} = useCategories()
    const {events, eventsLoading} = useEvents();
    const navigate = useNavigate()
    return (
      <>
        <IonLoading isOpen={loading || eventsLoading} message="loading..." />
        <IonCard className='content'>
            <IonCardContent>      
                <IonText style={{fontSize:'26px'}}>                      
                     It's Your Day, <br/> Make It Memorable!
                </IonText> <br/>                <br/>      
                <IonText style={{fontSize:'14px'}}>
                     Srikrishna Party Rentals LLC is an event rental and event decoration services company located in Cordelia Ln, Tracy, CA 95377, United States. Our professional team can help you plan an amazing event Party Rentals that meets all of your needs. We provide everything from party rental supplies to custom decoration services. Our goal is to make every event memorable for you.
                </IonText>
            </IonCardContent>
        </IonCard>          
        <IonItem>
          <IonLabel style={{ textAlign: "center" }}>Browse by categories</IonLabel>
        </IonItem>
        <div className="categories_cards">
          <IonCard key={"ALL"} onClick={() => navigate(encodeURIComponent(`/ALL`))} className="category_card">
              <IonCardContent>
                <img src={"https://thumbs.dreamstime.com/b/event-supplies-flat-glyph-icons-party-equipment-stage-constructions-visual-projector-stanchion-flipchart-marquee-signs-115703883.jpg"} alt={"img"} height="100" width="100" /> <br />
                <IonText>{'All'}</IonText>
              </IonCardContent>
            </IonCard>
          {[...categories].map((cat, index) => (
            <IonCard key={index} onClick={() => navigate(encodeURIComponent(`/${cat?.name}`))} className="category_card">
              <IonCardContent>
      
                <img src={(cat.image_url != null && cat.image_url!='')? cat.image_url : "https://res.cloudinary.com/dmm4awbwm/image/upload/v1746672352/rlrckqhdnfdnvohwt4xb.png"} alt={"img"} height="100" width="100" /> <br />
                <IonText style={{fontSize:'14px', fontWeight:'300'}}>{cat?.name}</IonText>
              </IonCardContent>
            </IonCard>
          ))}
        </div>
        <MobileCardCarousel  events={events}/>
      </>
    );
  };
  
export default MobileHomeContent