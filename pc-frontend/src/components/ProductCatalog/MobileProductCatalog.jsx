import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonImg, IonRow, IonSegment } from "@ionic/react"
import './ProductCatalog.css'

const MobileProductCatalog = ({products = []}) => {

    return (
        <>
        {
            products.map((product) => (
                <IonCard className="ion_card" key={product?.name}>
                    {product.image_url ? (                                                
                        <IonImg className='ion_img' src={product.image_url} alt={product.name} />                        
                    ) : (
                        <div style={{ height: '250px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <p style={{ color: '#999' }}>No Image</p>
                        </div>
                    )}
                    <IonCardHeader>
                        <IonCardSubtitle>{product.category}</IonCardSubtitle>
                        <IonCardTitle>{product.name}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                    <IonRow>
                        <IonCol>${product.price == 0? 0 + " contact for price":product.price}</IonCol>
                        {/* <IonCol>
                            <IonButton size="small" fill="outline">Add to Cart</IonButton>
                        </IonCol> */}
                    </IonRow>
                    </IonCardContent>
                </IonCard>  
            ))
        }            
        </>
    )
}

export default MobileProductCatalog