## Entity-Relationship diagram visualizer 

[Demo](https://pg-schema-visualizer.web.app/)

Copy this to the editor to start fast

```SQL
TABLE author {
    name        VARCHAR
    address     VARCHAR(255)
    url         VARCHAR(255)
}
    
TABLE publisher {
    name     VARCHAR(255)
    address  VARCHAR(255)
    phone    VARCHAR(255)
    url      VARCHAR(255)
}
    
TABLE book {
    ISBN           VARCHAR(255)
    authorName     VARCHAR(255) [ref: author.name]
    publisherName  VARCHAR(255) [ref: publisher.name]
    authorAddress  VARCHAR(255) [ref: author.address]
    year           INT(10)
    title          VARCHAR(255)
    price          NUMBER
}
    
TABLE customer {
    name     VARCHAR(255)
    email    VARCHAR(255)
    address  VARCHAR(255)
    phone    VARCHAR(255)
}
    
TABLE shopping_basket_book {
    shopping_basket_id  INT(10)      [ref: shopping_basket.id]
    bookISBN            VARCHAR(255) [ref: book.ISBN]
    count               INT(10)
}
    
TABLE shopping_basket {
    id             INT(10)
    customerEmail  VARCHAR(255) [ref: customer.email]
}
    
TABLE warehouse {
    code     INT(10)
    address  VARCHAR(255)
    phone    VARCHAR(255)
}
    
TABLE warehouse_book {
    count          INT(10)
    bookISBN       VARCHAR(255)  [ref: book.ISBN]
    warehouseCode  INT(10)       [ref: warehouse.code]
}

```
