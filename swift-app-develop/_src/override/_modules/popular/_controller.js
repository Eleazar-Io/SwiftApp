import React, {useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import {GET_BANNER_SLIDER} from '@app/services/queries/banner';
import {withProfiler} from '@sentry/react-native';
import {modules} from '@root/swift.config';
import {navigateTo} from '@app/helpers/Navigation';
import { GET_POPULAR } from './services/schema';

import Views from '@app/_modules/popular/_view';

const PopularController = props => {

    
    if (!modules.popular.enable) {
      return null;
    }
  
    /**
     * ---------------------------------------------------- *
     * @var hooks
     * @return {object}
     * ---------------------------------------------------- *
     */

    const {loading, error, data} = useQuery(GET_POPULAR)

    const [bannerSlider, setBannerSlider] = useState([]);
    const {data: bannerSliderData} = useQuery(GET_BANNER_SLIDER);
  
    /**
     * ---------------------------------------------------- *
     * @function {lifecycle}
     * ---------------------------------------------------- *
     */
    useEffect(() => {
      if (bannerSliderData) {
        setBannerSlider(bannerSliderData.getHomepageSlider.images);
      }
    }, [bannerSliderData]);
  
    /**
     * ---------------------------------------------------- *
     * @constant controllerProps
     * @return {object}
     * ---------------------------------------------------- *
     */
  
    const controllerProps = {
      bannerSlider,
      loading,
      error,
      data
    };
  
    return <Views {...props} {...controllerProps} />;
  };
  
  export default withProfiler(PopularController, {name: 'Popular'});
  