import PivotSheet from './components/sheet';

// 按需引入
export { PivotSheet };

const component = [PivotSheet];

const install = {
	install(App) {
		component.forEach((item) => {
			App.component(item.name, PivotSheet);
		});
	},
};

export default install;
