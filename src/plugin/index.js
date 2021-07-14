import Vue from 'vue'
import { Swipe, SwipeItem, Lazyload, Tab, Tabs, Sticky, List, Loading, Collapse, CollapseItem, ShareSheet, GoodsAction, GoodsActionIcon, GoodsActionButton, Sku, Form, Field,Uploader,Button,RadioGroup,Radio} from 'vant';
import 'vant/lib/index.css';
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Sticky);
Vue.use(List);
Vue.use(Loading);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(ShareSheet);
Vue.use(Sku);
Vue.use(Form);
Vue.use(Field);
Vue.use(Uploader);
Vue.use(Button);
Vue.use(RadioGroup);
Vue.use(Radio);

Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);

Vue.prototype.$toast = function(message){
  Toast({
    message
});
}