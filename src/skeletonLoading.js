import React from 'react';
import {Box, Skeleton} from "@chakra-ui/react";

const SkeletonLoading = () => {
    let rows= []
    for (let i = 0; i < 6; i++) {
        rows.push(
            <Box key={i} mt={'10px'} display={'flex'} flexDirection={'row'} alignItems={'center'} gap={2}>
                <Skeleton width={{base: '80%', md: '70%'}} height='40px' />
                <Skeleton width={{base: '10%', md: '15%'}} height='40px' />
                <Skeleton width={{base: '10%', md: '15%'}} height='40px' />
            </Box>
        );
    }
    return (
        <Box>
            {rows}
        </Box>

    );
};

export default SkeletonLoading;