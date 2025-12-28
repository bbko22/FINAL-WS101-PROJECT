package com.artisan.artisan.config;

import com.artisan.artisan.model.Product;
import com.artisan.artisan.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {
    private final ProductRepository repository;

    public DataLoader(ProductRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        if (repository.count() > 0) return;

        var products = List.of(
            new Product(null, "Handwoven Ceramic Bowl", 450.00, "Traditional Filipino ceramic bowl handcrafted by local artisans.", "Handcrafted.", "Maria Rodriguez", "Bacolod, PH", "Ceramics", true, "images/oip/OIP.jpg"),
            new Product(null, "Banig Woven Mat", 380.00, "Traditional sleeping mat woven with natural palm leaves.", "Handwoven.", "Lola Ana", "Iloilo, PH", "Textiles", true, "images/wlis.jpg"),
            new Product(null, "Wooden Salad Bowl", 550.00, "Premium hardwood salad bowl made from sustainably sourced materials.", "Carved.", "James Wilson", "Bohol, PH", "Woodworking", true, "images/oip/OIP.jpg"),
            new Product(null, "Silver Filigree Earrings", 280.00, "Elegant handmade silver filigree earrings - traditional Filipino craft.", "Forged.", "Elena Vasquez", "Cebu, PH", "Jewelry", true, "images/wlis.jpg"),
            new Product(null, "Abaca Woven Basket", 320.00, "Beautiful storage basket woven from sustainable abaca fiber.", "Woven.", "Rhea Santos", "Bicol, PH", "Baskets", true, "images/oip/OIP.jpg"),
            new Product(null, "Malong Traditional Fabric", 420.00, "Traditional woven cylindrical cloth used in Mindanao culture.", "Patterned.", "Tala", "Mindanao, PH", "Textiles", true, "images/wlis.jpg"),
            new Product(null, "Capiz Shell Wind Chime", 350.00, "Decorative wind chime made with translucent capiz shells.", "Capiz made.", "Ari Reyes", "Pangasinan, PH", "Decor", true, "images/oip/OIP.jpg"),
            new Product(null, "Rattan Furniture Set", 1200.00, "Hand-woven rattan furniture perfect for home or garden.", "Rattan.", "Household", "Davao, PH", "Furniture", true, "images/wlis.jpg"),
            new Product(null, "Brass Decorative Plate", 280.00, "Intricately engraved brass plate from Zamboanga artisans.", "Engraved.", "Zamboanga Artisans", "Zamboanga, PH", "Decor", true, "images/9.jpg"),
            new Product(null, "Lumpia Clay Pot", 395.00, "Traditional Filipino clay cooking pot for authentic lumpia.", "Baked.", "Minda", "Bulacan, PH", "Cookware", true, "images/wlis.jpg"),
            new Product(null, "T'boli Beaded Necklace", 520.00, "Indigenous T'boli tribal beaded necklace with traditional patterns.", "Beaded.", "T'boli Artisans", "South Cotabato, PH", "Jewelry", true, "images/11.jpg"),
            new Product(null, "Barong Tagalog Fabric", 850.00, "Premium hand-embroidered barong fabric for traditional Filipino wear.", "Embroidered.", "Lolo", "Quezon, PH", "Textiles", true, "images/wlis.jpg"),
            new Product(null, "Coconut Shell Bowls", 245.00, "Eco-friendly bowls handcrafted from natural coconut shells.", "Eco.", "Coco", "Palawan, PH", "Kitchenware", true, "images/13.jpg"),
            new Product(null, "Piña Cloth Hand Fan", 380.00, "Beautiful hand fan made from delicate piña pineapple fiber cloth.", "Fan.", "Liza", "Iloilo, PH", "Textiles", true, "images/wlis.jpg"),
            new Product(null, "Inlaid Mother of Pearl Box", 650.00, "Ornate wooden box with mother of pearl inlay from Iloilo.", "Inlaid.", "Iloilo Crafts", "Iloilo, PH", "Decor", true, "images/15.jpg")
        );

        repository.saveAll(products);
    }
}
