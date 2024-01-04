import PivotSheet from './Sheet.vue';
PivotSheet.install = (app) => {
    app.component(Sheet.name, Sheet);
    return app;
}
 
export default PivotSheet;