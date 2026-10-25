package com.stock.config;

import com.stock.model.*;
import com.stock.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Instant;
import java.util.List;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initData(
            UserRepository userRepo,
            CategoryRepository categoryRepo,
            SupplierRepository supplierRepo,
            ProductRepository productRepo,
            StockMovementRepository stockRepo
    ) {
        return args -> {

            // Users
            userRepo.saveAll(List.of(
                    new User("1", "admin", "admin123", "admin", "Administrateur"),
                    new User("2", "employe", "employe123", "employee", "Jean Dupont")
            ));

            // Categories
            categoryRepo.saveAll(List.of(
                    new Category("1", "Électronique", "Produits électroniques et accessoires"),
                    new Category("2", "Alimentation", "Produits alimentaires et boissons"),
                    new Category("3", "Bureautique", "Fournitures de bureau"),
                    new Category("4", "Mobilier", "Meubles et équipements")
            ));

            // Suppliers
            supplierRepo.saveAll(List.of(
                    new Supplier("1", "TechSupply Pro", "Marie Laurent", "01 23 45 67 89", "contact@techsupply.fr", "15 Rue de la Tech, 75001 Paris"),
                    new Supplier("2", "AlimDistrib", "Pierre Martin", "01 98 76 54 32", "info@alimdistrib.fr", "8 Avenue du Commerce, 69001 Lyon"),
                    new Supplier("3", "Bureau Plus", "Sophie Dubois", "04 56 78 90 12", "contact@bureauplus.fr", "22 Boulevard des Fournitures, 33000 Bordeaux")
            ));

            // Products
            productRepo.saveAll(List.of(
            	    new Product(
            	        "1",
            	        "Ordinateur portable Dell",
            	        "Ordinateur portable 15 pouces, 16GB RAM, 512GB SSD",
            	        "1",   // categoryId
            	        "1",   // supplierId
            	        899.99,
            	        5,
            	        10,
            	        "2024-01-15T00:00:00Z",  // createdAt
            	        "2024-11-01T00:00:00Z"   // updatedAt
            	    ),
            	    new Product(
            	        "2",
            	        "Souris sans fil Logitech",
            	        "Souris ergonomique sans fil",
            	        "1",
            	        "1",
            	        29.99,
            	        3,
            	        15,
            	        "2024-02-20T00:00:00Z",
            	        "2024-11-02T00:00:00Z"
            	    )
            	    // ajoute les autres produits ici
            	));


            // Stock Movements
            stockRepo.saveAll(List.of(
            	    new StockMovement(
            	        "1",
            	        "1",           // productId
            	        "in",          // type
            	        10,            // quantity
            	        "2024-10-01T00:00:00Z", // date
            	        "Réapprovisionnement",
            	        "Jean Dupont"  // user
            	    ),
            	    new StockMovement(
            	        "2",
            	        "1",
            	        "out",
            	        5,
            	        "2024-10-15T00:00:00Z",
            	        "Vente client",
            	        "Jean Dupont"
            	    ),
            	    new StockMovement(
            	        "3",
            	        "3",
            	        "in",
            	        30,
            	        "2024-10-20T00:00:00Z",
            	        "Réapprovisionnement",
            	        "Administrateur"
            	    ),
            	    new StockMovement(
            	        "4",
            	        "2",
            	        "out",
            	        7,
            	        "2024-11-01T00:00:00Z",
            	        "Utilisation interne",
            	        "Jean Dupont"
            	    )
            	));


            System.out.println("Data insérée avec succès !");
        };
    }
}
