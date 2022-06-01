import React from "react";

import { MyWishlistContainer } from "./myWishlist.styles";

import CourseOverview from "../../components/courseOverview/courseOverview.component";
import { SimpleGrid, GridItem, Text } from "@chakra-ui/react";

const MyWishlist = () => {
  return (
    <MyWishlistContainer>
      <Text fontSize="2xl" fontWeight="600" margin="50px 0px 0px 0px">
        YOUR WISHLIST:
      </Text>
      <SimpleGrid
        columns={[2, 2, 3, 4, 5]}
        spacing={["10px", "20px", "25px", "25px", "30px"]}
        width="100%"
        margin="20px auto 20px auto"
      >
        <GridItem>
          <CourseOverview />
        </GridItem>
        <GridItem>
          <CourseOverview />
        </GridItem>
        <GridItem>
          <CourseOverview />
        </GridItem>
      </SimpleGrid>
    </MyWishlistContainer>
  );
};

export default MyWishlist;
