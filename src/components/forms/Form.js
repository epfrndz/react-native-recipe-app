import { View, Text } from "react-native";
import React, { useState } from "react";
import { FormControl, HStack, VStack, Input, Button, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";

const Form = (props) => {
  const { onInputChange, fetchRecipes } = props;
  const [formData, setData] = useState({});
  const [errors, setErrors] = useState({});

  const onSubmit = () => {
    console.log("form submitted")
    fetchRecipes()
  };

  return (
    <View>
      <VStack space={2} width="100%" py={5}>
        <FormControl isRequired>
          <FormControl.Label fontSize={"sm"}>
            Ingredient Search
          </FormControl.Label>
          <HStack width="100%" space={2}>
            <Input
              placeholder="i.e. beef, chicken, pork"
              variant="filled"
              bg="gray.200"
              px={3}
              width="85%"
              InputLeftElement={
                <Icon
                  size={5}
                  ml={2}
                  color="gray.400"
                  name="ios-search"
                  as={<Ionicons />}
                />
              }
              onChangeText={value => {
                onInputChange(value)
                setData({ ...formData, name: value})
              }}
            />
            <Button
              onPress={onSubmit}
              startIcon={<Icon as={Ionicons} name="ios-search" />}
            >
              Search
            </Button>
          </HStack>
        </FormControl>
      </VStack>
    </View>
  );
};

export default Form;
