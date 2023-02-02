import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Center, Container } from "native-base";
import Form from "../forms/Form";
import { Loading } from "../layout/Loading";
import { getRecipes } from "../services/api";
import RecipeList from "../lists/RecipeList";

const RecipesContainer = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [ingredient, setIngredient] = useState(null);

  const data = [
    {
      recipe: {
        image:
          "https://edamam-product-images.s3.amazonaws.com/web-img/889/88989a61c8c566b8d29ed6b982fb06d8.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLWVhc3QtMSJHMEUCIB1QC7ZHsZ19yf4KAm988H02Qxdx53VO0beQt%2ByyS4S6AiEAyAcpVdTwQa9pxIUIfTmua6iL4PGLstFiiCBY5k2SHdwq1QQI0P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDGnKQqEdv5z4OLZ3cCqpBHgQLVgab6kHsIRO3fLV3hvDJm2cQ%2FSU0LRJDmgthxQI4SKo37J%2Fxk%2BpAbKGdCr9nVeBKpKReFaPdzFDGD6R%2BP%2FF1R7J%2BKTcJXhQHFQXkaW6LbVVjip7AFVB7t9%2BvHeHbkqAf6fPg6r0N%2BZ5i5KNjEspiAPvOHz5Rt8xhdkcA%2BWO982CvpUwwpLCG6BbaJXVLX3Kkj9icWzpuY7cStEH%2FjYXUbBwDc6UUDIEOhSDQgCRxy9YvHotn3Br7MzxR%2BcHJecXq%2F0eIssA4o3ii4F07roIbvSYR%2BsgDbYQ8d33TcOj7%2FdbemrISTy0joFwe2BAgKL%2BpC6iv%2FexEaKJM0oQkMZudi6VFQolD2XZCo9TaCacGT%2Brsq0V7tnbXlO%2F8qXMQi9jkrAgauJNWw2m018nsfz%2BNiAztM6IdGm%2BMl61ri%2FHyi%2F9pwGNW3k6YTTDd%2F1k57nI4WPBK7g%2Fe08IxAKtcFHc%2ByCVUPR92PExODBayaPAI18QZQdSoyuL5hx%2F1T9VPkvNW8s2TwpUQnBkbyHg3Gm6%2BOqoypOJyOxCFc1vyQQ0yYE9i5sBrcIgnXQUNapfuu6qCxtdOMMIXBAXKS9w8wK9tSo1ez2jFUAMD5joVsXmJieZ6papcOVK0UOeMNARf5cwAiu6g%2Ft97%2BHt3jHjQ1AiqXcPa8ddB3ZBldQVJqV95NAHwNLIKfyQ6bt6KlsoPSKbMdtH68iAuNclJomaE0Wly88DeT1SXf8w47jtngY6qQEImOotgRe19%2BkRhRROJzp93khzP1n1ig%2BHENZ%2BlsFQ6FtMh7xhTc%2B4JPvkLzpc1gzJDFJQ%2Bn4bgzzxgKJqMyQij8KutWiWxRXHnh%2BBuH30TkMJmXmWbutbFJR4ReWpOECG0P5lesokCFyDtfB%2FCWF33Qn4VLj%2B6RuqIoUse89ghDg21eM3JRLQJ98HK429aQXmftvHm4Ea6v7sQCoDVXGBQCDsCnxixZ4a&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230202T074907Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFP5G74URC%2F20230202%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=bd58359db0c4c035fea0c95c73bbb9caab060930968a682d8f726bd37c03069b",
        label: "Roast sirloin of beef",
        source: "BBC Good Food",
        uri: "http://www.edamam.com/ontologies/edamam.owl#recipe_62ebc9d43ec31eace0c035db993eb1f5",
      },
    },
    {
      recipe: {
        image:
          "https://edamam-product-images.s3.amazonaws.com/web-img/ad3/ad35ae4c847dcd39bad104838007f84a.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLWVhc3QtMSJHMEUCIB1QC7ZHsZ19yf4KAm988H02Qxdx53VO0beQt%2ByyS4S6AiEAyAcpVdTwQa9pxIUIfTmua6iL4PGLstFiiCBY5k2SHdwq1QQI0P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDGnKQqEdv5z4OLZ3cCqpBHgQLVgab6kHsIRO3fLV3hvDJm2cQ%2FSU0LRJDmgthxQI4SKo37J%2Fxk%2BpAbKGdCr9nVeBKpKReFaPdzFDGD6R%2BP%2FF1R7J%2BKTcJXhQHFQXkaW6LbVVjip7AFVB7t9%2BvHeHbkqAf6fPg6r0N%2BZ5i5KNjEspiAPvOHz5Rt8xhdkcA%2BWO982CvpUwwpLCG6BbaJXVLX3Kkj9icWzpuY7cStEH%2FjYXUbBwDc6UUDIEOhSDQgCRxy9YvHotn3Br7MzxR%2BcHJecXq%2F0eIssA4o3ii4F07roIbvSYR%2BsgDbYQ8d33TcOj7%2FdbemrISTy0joFwe2BAgKL%2BpC6iv%2FexEaKJM0oQkMZudi6VFQolD2XZCo9TaCacGT%2Brsq0V7tnbXlO%2F8qXMQi9jkrAgauJNWw2m018nsfz%2BNiAztM6IdGm%2BMl61ri%2FHyi%2F9pwGNW3k6YTTDd%2F1k57nI4WPBK7g%2Fe08IxAKtcFHc%2ByCVUPR92PExODBayaPAI18QZQdSoyuL5hx%2F1T9VPkvNW8s2TwpUQnBkbyHg3Gm6%2BOqoypOJyOxCFc1vyQQ0yYE9i5sBrcIgnXQUNapfuu6qCxtdOMMIXBAXKS9w8wK9tSo1ez2jFUAMD5joVsXmJieZ6papcOVK0UOeMNARf5cwAiu6g%2Ft97%2BHt3jHjQ1AiqXcPa8ddB3ZBldQVJqV95NAHwNLIKfyQ6bt6KlsoPSKbMdtH68iAuNclJomaE0Wly88DeT1SXf8w47jtngY6qQEImOotgRe19%2BkRhRROJzp93khzP1n1ig%2BHENZ%2BlsFQ6FtMh7xhTc%2B4JPvkLzpc1gzJDFJQ%2Bn4bgzzxgKJqMyQij8KutWiWxRXHnh%2BBuH30TkMJmXmWbutbFJR4ReWpOECG0P5lesokCFyDtfB%2FCWF33Qn4VLj%2B6RuqIoUse89ghDg21eM3JRLQJ98HK429aQXmftvHm4Ea6v7sQCoDVXGBQCDsCnxixZ4a&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230202T074907Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFP5G74URC%2F20230202%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=f9dbfe0ef5656ef7605e11196778d6505a2b1905a078695c56a9529e9e039054",
        label: "Beef Tea",
        source: "Epicurious",
        uri: "http://www.edamam.com/ontologies/edamam.owl#recipe_0f3a359371750f372c7ac3c1459751d9",
      },
    },
  ];

  // useEffect(() => {
  //   setRecipes(data)
  // }, [])

  const fetchRecipes = () => {
    setIsLoading(true);
    // getRecipes(ingredient).then(
    //   recipeData => {
    //     setRecipes(recipeData)
    //     console.log(recipeData)
    //   },
    //   error => {
    //     console.log('Error', error)
    //   }
    // )

    setRecipes(data);
    setIsLoading(false);
  };

  const handleInputChange = (ingredient) => {
    setIngredient(ingredient);
  };

  useEffect(() => {
    console.log("ingredient >>>", ingredient);
  }, [ingredient]);

  return (
    <Container>
      <Center px={4}>
        <Form onInputChange={handleInputChange} fetchRecipes={fetchRecipes} />
        {isLoading ? (
          <Loading />
        ) : (
          <RecipeList recipes={recipes} navigation={navigation} />
        )}
      </Center>
    </Container>
  );
};

export default RecipesContainer;
