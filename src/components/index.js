import Page from './page'
import Header from './head'
import Cell from './cell'
import {Swiper, SwiperItem} from './swiper'

const install = function(Vue) {
  if (install.installed) return;

  Vue.component(Header.name, Header);
  Vue.component(Button.name, Button);
  Vue.component(Cell.name, Cell);
  Vue.component(CellSwipe.name, CellSwipe);
  Vue.component(Field.name, Field);
  Vue.component(Badge.name, Badge);
  Vue.component(Switch.name, Switch);
  Vue.component(Spinner.name, Spinner);
  Vue.component(TabItem.name, TabItem);
  Vue.component(TabContainerItem.name, TabContainerItem);
  Vue.component(TabContainer.name, TabContainer);
  Vue.component(Navbar.name, Navbar);
  Vue.component(Tabbar.name, Tabbar);
  Vue.component(Search.name, Search);
  Vue.component(Checklist.name, Checklist);
  Vue.component(Radio.name, Radio);
  Vue.component(Loadmore.name, Loadmore);
  Vue.component(Actionsheet.name, Actionsheet);
  Vue.component(Popup.name, Popup);
  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
  Vue.component(Range.name, Range);
  Vue.component(Picker.name, Picker);
  Vue.component(Progress.name, Progress);
  Vue.component(DatetimePicker.name, DatetimePicker);
  Vue.component(IndexList.name, IndexList);
  Vue.component(IndexSection.name, IndexSection);
  Vue.component(PaletteButton.name, PaletteButton);
  Vue.use(InfiniteScroll);

  Vue.$messagebox = Vue.prototype.$messagebox = MessageBox;
  Vue.$toast = Vue.prototype.$toast = Toast;
  Vue.$indicator = Vue.prototype.$indicator = Indicator;
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

module.exports = {
  install,
  version,
  Header,
  Button,
  Cell,
  CellSwipe,
  Field,
  Badge,
  Switch,
  Spinner,
  TabItem,
  TabContainerItem,
  TabContainer,
  Navbar,
  Tabbar,
  Search,
  Checklist,
  Radio,
  Loadmore,
  Actionsheet,
  Popup,
  Swipe,
  SwipeItem,
  Range,
  Picker,
  Progress,
  Toast,
  Indicator,
  MessageBox,
  InfiniteScroll,
  Lazyload,
  DatetimePicker,
  IndexList,
  IndexSection,
  PaletteButton
};
