import fake from "faker"
import { getManager } from "typeorm"
import { Option } from "../models/option.entity"
import { OptionValue } from "../models/optionValue.entity"
import { Product } from "../models/product.entity"
import { ProductImg } from "../models/productImg.entity"
import { ProductOption } from "../models/productOption.entity"

export const productImg = [
  '415511.jpg',
  '83726.jpg',
  '584352.png',
  '585352.jpg',
  '175253.jpg',
  '613932.png',
  '125085.jpg',
]

export const product = []
export const data = async () => {
  const option = new Option()
  option.name = "Kích cỡ";
  option.meta = "text";
  await getManager().save(option);

  const option1 = new Option()
  option1.name = "Màu sắc";
  option1.meta = "color";
  await getManager().save(option1);

  const optionVariant = new OptionValue()
  optionVariant.name = "S";
  optionVariant.option = option
  await getManager().save(optionVariant);

  const optionVariant1 = new OptionValue()
  optionVariant1.name = "M";
  optionVariant1.option = option
  await getManager().save(optionVariant1);

  const optionVariant2 = new OptionValue()
  optionVariant2.name = "XL";
  optionVariant2.option = option
  await getManager().save(optionVariant2);

  const optionVariant3 = new OptionValue()
  optionVariant3.name = "XXL";
  optionVariant3.option = option
  await getManager().save(optionVariant3);

  const optionVariant4 = new OptionValue()
  optionVariant4.name = "orange";
  optionVariant4.option = option1
  await getManager().save(optionVariant4);

  const optionVariant5 = new OptionValue()
  optionVariant5.name = "yellow";
  optionVariant5.option = option1
  await getManager().save(optionVariant5);

  const optionVariant6 = new OptionValue()
  optionVariant6.name = "green";
  optionVariant6.option = option1
  await getManager().save(optionVariant6);

  const product = []
  for (let i =0; i < 10 ; i++ ){
    let temp = new Product()
    temp.name = fake.commerce.product();
    temp.price = fake.commerce.price();
    temp.description = fake.commerce.productDescription();

    const source = Math.floor(Math.random() * productImg.length)
    const source2 = Math.floor(Math.random() *  productImg.length)

    let img1 = new ProductImg()
    img1.imgPath = productImg[source]
    img1.name = productImg[source]
    await getManager().save(img1)

    let img2 = new ProductImg()
    img2.imgPath = productImg[source2]
    img2.name = productImg[source2]
    await getManager().save(img2)

    temp.productImg = [
      img1,
      img2
    ];

    await getManager().save(temp);
    product.push(temp)
  }

  const productOption = new ProductOption()
  productOption.option = option;
  productOption.optionValue = optionVariant;
  productOption.product = product[0]
  await getManager().save(productOption);

  const productOption1 = new ProductOption()
  productOption1.option = option;
  productOption1.optionValue = optionVariant1;
  productOption1.product = product[0]
  await getManager().save(productOption1);

  const productOption2 = new ProductOption()
  productOption2.option = option;
  productOption2.optionValue = optionVariant2;
  productOption2.product = product[0]
  await getManager().save(productOption2);

  const productOption3 = new ProductOption()
  productOption3.option = option1;
  productOption3.optionValue = optionVariant4;
  productOption3.product = product[0]
  await getManager().save(productOption3);

  const productOption4 = new ProductOption()
  productOption4.option = option1;
  productOption4.optionValue = optionVariant5;
  productOption4.product = product[0]
  await getManager().save(productOption4);

  const productOption5 = new ProductOption()
  productOption5.option = option;
  productOption5.optionValue = optionVariant;
  productOption5.product = product[1]
  await getManager().save(productOption5);

  const productOption6 = new ProductOption()
  productOption6.option = option;
  productOption6.optionValue = optionVariant1;
  productOption6.product = product[1]
  await getManager().save(productOption6);

  const productOption7 = new ProductOption()
  productOption7.option = option;
  productOption7.optionValue = optionVariant;
  productOption7.product = product[2]
  await getManager().save(productOption7);

  const productOption8 = new ProductOption()
  productOption8.option = option;
  productOption8.optionValue = optionVariant1;
  productOption8.product = product[2]
  await getManager().save(productOption8);

  const productOption9 = new ProductOption()
  productOption9.option = option;
  productOption9.optionValue = optionVariant2;
  productOption9.product = product[2]
  await getManager().save(productOption9);

  const productOption10 = new ProductOption()
  productOption10.option = option1;
  productOption10.optionValue = optionVariant6;
  productOption10.product = product[2]
  await getManager().save(productOption10);

  const productOption11 = new ProductOption()
  productOption11.option = option1;
  productOption11.optionValue = optionVariant4;
  productOption11.product = product[3]
  await getManager().save(productOption11);

  const productOption12 = new ProductOption()
  productOption12.option = option1;
  productOption12.optionValue = optionVariant4;
  productOption12.product = product[4]
  await getManager().save(productOption12);

  const productOption13 = new ProductOption()
  productOption13.option = option1;
  productOption13.optionValue = optionVariant5;
  productOption13.product = product[5]
  await getManager().save(productOption13);

  const productOption14 = new ProductOption()
  productOption14.option = option;
  productOption14.optionValue = optionVariant2;
  productOption14.product = product[5]
  await getManager().save(productOption14);

  const productOption15 = new ProductOption()
  productOption15.option = option;
  productOption15.optionValue = optionVariant1;
  productOption15.product = product[6]
  await getManager().save(productOption15);

  const productOption16 = new ProductOption()
  productOption16.option = option1;
  productOption16.optionValue = optionVariant4;
  productOption16.product = product[7]
  await getManager().save(productOption16);

  const productOption17 = new ProductOption()
  productOption17.option = option1;
  productOption17.optionValue = optionVariant5;
  productOption17.product = product[7]
  await getManager().save(productOption17);

  const productOption18 = new ProductOption()
  productOption18.option = option;
  productOption18.optionValue = optionVariant1;
  productOption18.product = product[8]
  await getManager().save(productOption18);

  const productOption19 = new ProductOption()
  productOption19.option = option;
  productOption19.optionValue = optionVariant2;
  productOption19.product = product[8]
  await getManager().save(productOption19);

  const productOption20 = new ProductOption()
  productOption20.option = option1;
  productOption20.optionValue = optionVariant4;
  productOption20.product = product[9]
  await getManager().save(productOption20);

  const productOption21 = new ProductOption()
  productOption21.option = option1;
  productOption21.optionValue = optionVariant6;
  productOption21.product = product[9]
  await getManager().save(productOption21);

  const productOption22 = new ProductOption()
  productOption22.option = option;
  productOption22.optionValue = optionVariant2;
  productOption22.product = product[9]
  await getManager().save(productOption22);

  const productOption23 = new ProductOption()
  productOption23.option = option;
  productOption23.optionValue = optionVariant3;
  productOption23.product = product[9]
  await getManager().save(productOption23);
}


