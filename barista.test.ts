import { describe, expect, it } from "vitest";
import { Coffee } from "./barista";
import { Ingredient } from "./barista";
import { Barista } from "./barista";

describe("Coffee", () => {
  it("crée un café avec un nom et un prix", () => {
    const coffee = new Coffee("Cappuccino", 4);

    expect(coffee.name).toBe("Cappuccino");
    expect(coffee.price).toBe(4);
  });

  it("ajoute un ingrédient à la recette", () => {
    const ingredient = new Ingredient("chocolat", 5);

    expect(ingredient.name).toBe("chocolat");
    expect(ingredient.quantity).toBe(5);
  });
});

describe("Ingredient", () => {
  it("ajoute une quantité au stock", () => {
    const ingredient = new Ingredient("café", 5);
    ingredient.addQuantity(2);

    expect(ingredient.quantity).toBe(7);
  });

  it("retire une quantité du stock", () => {
    const ingredient = new Ingredient("café", 7);
    ingredient.removeQuantity(8);

    expect(ingredient.quantity).toBe(7);
  });

  it("refuse de retirer une quantité supérieure au stock", () => { });
  const ingredient = new Ingredient("café", 7);
  const result = ingredient.removeQuantity(8);

  expect(result).toBe(false);
  expect(ingredient.quantity).toBe(7);
});

describe("Barista", () => {
  it("ajoute un café à sa liste de cafés", () => {
    const coffee = new Coffee("Espresso", 5);
    const b = new Barista('Brian');
    b.addCoffee(coffee);

    expect(b.coffees).toContain(coffee);
  });

  it("retourne undefined lorsqu'un café n'existe pas", () => {
    const b = new Barista('Brian');
    const coffee = b.getCoffee("espresso");

    expect(coffee).toBeUndefined();

  });

  it("peut préparer un café lorsque tous les ingrédients sont disponibles", () => {
    const coffee = new Coffee("Cappuccino", 4);
    coffee.addIngredient("café", 1);
    coffee.addIngredient("lait", 2);
    const b = new Barista("Brian");
    b.addIngredient("café", 5);
    b.addIngredient("lait", 10);

    expect(b.canMakeCoffee(coffee)).toBe(true);
  });

  it("ne peut pas préparer un café lorsqu'un ingrédient est manquant", () => {
    const coffee = new Coffee("Cappuccino", 4);
    coffee.addIngredient("café", 1);
    coffee.addIngredient("lait", 2);
    const b = new Barista("Brian");
    b.addIngredient("café", 5);

    expect(b.canMakeCoffee(coffee)).toBe(false);
  });

  it("ne peut pas préparer un café lorsque la quantité est insuffisante", () => {
    const coffee = new Coffee("Espresso", 5);
    coffee.addIngredient("café", 3);
    const b = new Barista("Brian");
    b.addIngredient("café", 2);

    expect(b.canMakeCoffee(coffee)).toBe(false);
  });

  it("consomme les ingrédients lorsqu'il prépare un café", () => {

    const coffee = new Coffee("Cappuccino", 4);
    coffee.addIngredient("café", 1);
    coffee.addIngredient("lait", 2);

    const b = new Barista("Brian");
    b.addIngredient("café", 5);
    b.addIngredient("lait", 10);
    b.makeCoffee(coffee);

    expect(b.ingredients[0].quantity).toBe(4);
    expect(b.ingredients[1].quantity).toBe(8);

  });

  it("ne consomme rien lorsqu'il ne peut pas préparer le café", () => {
    const coffee = new Coffee("Espresso", 5);
    coffee.addIngredient("café", 3);

    const b = new Barista("Brian");
    b.addIngredient("lait", 5);
    b.makeCoffee(coffee);

    expect(b.ingredients[0].quantity).toBe(5);
  });

  it("retourne le prix lorsqu'un café est commandé", () => {
    const coffee = new Coffee("Cappuccino", 4);
    coffee.addIngredient("café", 1);

    const b = new Barista("Brian");
    b.addCoffee(coffee);
    b.addIngredient("café", 5);

    const price = b.orderCoffee("Cappuccino");

    expect(price).toBe(4);
  });
});
