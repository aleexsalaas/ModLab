package com.example.sharedkernel.appservices.serializers;

import java.util.List;
import java.util.TreeMap;

import com.example.Models.CPU.DTO.CPUDTO;
import com.example.Models.PaymentMethod.DTO.PaymentMethodDTO;
import com.example.Models.Product.DTO.ProductDTO;
import com.example.Models.Review.DTO.ReviewDTO;
// import com.example.Models.GraphicCard.DTO.GraphicCardDTO;
// import com.example.Models.HardDrive.DTO.HardDriveDTO;
// import com.example.Models.Motherboard.DTO.MotherBoardDTO;
// import com.example.Models.PaymentMethod.DTO.PaymentMethodDTO;
// import com.example.Models.PowerSupply.DTO.PowerSupplyDTO;
// import com.example.Models.Ram.DTO.RamDTO;
import com.example.Models.ShippingAddress.DTO.ShippingAddressDTO;
import com.example.Models.ShopCart.DTO.ShopCartDTO;
// import com.example.Models.Tower.DTO.TowerDTO;
import com.example.Models.User.DTO.UserDTO;
// import com.example.Models.Ventilation.DTO.VentilationDTO;
import com.fasterxml.jackson.core.type.TypeReference;

public class SerializersCatalog {

    private static final TreeMap<Serializers, Serializer<?>> catalog = new TreeMap<>();

    private static void loadCatalog() {
        catalog.put(Serializers.USER_JSON, new JacksonSerializer<UserDTO>());
        catalog.put(Serializers.SHIPPINGADDRESS_JSON, new JacksonSerializer<ShippingAddressDTO>());
        catalog.put(Serializers.SHIPPINGADDRESS_JSON_LIST, new JacksonSerializer<List<ShippingAddressDTO>>(new TypeReference<List<ShippingAddressDTO>>() {}));
        catalog.put(Serializers.CPU_JSON, new JacksonSerializer<CPUDTO>());
        catalog.put(Serializers.CPU_JSON_LIST, new JacksonSerializer<List<CPUDTO>>(new TypeReference<List<CPUDTO>>() {}));
        catalog.put(Serializers.REVIEW_JSON, new JacksonSerializer<ReviewDTO>());
        catalog.put(Serializers.SHOPCART_JSON, new JacksonSerializer<ShopCartDTO>());
        catalog.put(Serializers.SHOPCART_JSON_LIST, new JacksonSerializer<List<ShopCartDTO>>(new TypeReference<List<ShopCartDTO>>() {}));
        catalog.put(Serializers.PRODUCT_JSON, new JacksonSerializer<ProductDTO>());      
        catalog.put(Serializers.PAYMENTMETHOD_JSON, new JacksonSerializer<PaymentMethodDTO>());
        catalog.put(Serializers.ORDER_JSON, new JacksonSerializer<PaymentMethodDTO>());
        catalog.put(Serializers.ORDER_DETAIL_JSON, new JacksonSerializer<PaymentMethodDTO>());
        
        // catalog.put(Serializers.GraphicCard_JSON, new JacksonSerializer<GraphicCardDTO>());
        // catalog.put(Serializers.HardDrive_JSON, new JacksonSerializer<HardDriveDTO>());
        // catalog.put(Serializers.Motherboard_JSON, new JacksonSerializer<MotherBoardDTO>());
        // catalog.put(Serializers.PowerSupply_JSON, new JacksonSerializer<PowerSupplyDTO>());
        // catalog.put(Serializers.Ram_JSON, new JacksonSerializer<RamDTO>());
        // catalog.put(Serializers.Tower_JSON, new JacksonSerializer<TowerDTO>());
        // catalog.put(Serializers.Ventilation_JSON, new JacksonSerializer<VentilationDTO>());
        
        
    }

    public static Serializer getInstance(Serializers type) {
        if (catalog.isEmpty()) {
            loadCatalog();
        }
        return catalog.get(type);
    }

}