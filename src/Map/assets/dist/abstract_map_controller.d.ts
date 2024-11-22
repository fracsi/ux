import { Controller } from '@hotwired/stimulus';
export type Point = {
    lat: number;
    lng: number;
};
export type MarkerDefinition<MarkerOptions, InfoWindowOptions> = {
    '@id': string;
    position: Point;
    title: string | null;
    infoWindow?: Omit<InfoWindowDefinition<InfoWindowOptions>, 'position'>;
    rawOptions?: MarkerOptions;
    extra: Record<string, unknown>;
};
export type PolygonDefinition<PolygonOptions, InfoWindowOptions> = {
    '@id': string;
    infoWindow?: Omit<InfoWindowDefinition<InfoWindowOptions>, 'position'>;
    points: Array<Point>;
    title: string | null;
    rawOptions?: PolygonOptions;
    extra: Record<string, unknown>;
};
export type InfoWindowDefinition<InfoWindowOptions> = {
    headerContent: string | null;
    content: string | null;
    position: Point;
    opened: boolean;
    autoClose: boolean;
    rawOptions?: InfoWindowOptions;
    extra: Record<string, unknown>;
};
export default abstract class<MapOptions, Map, MarkerOptions, Marker, InfoWindowOptions, InfoWindow, PolygonOptions, Polygon> extends Controller<HTMLElement> {
    static values: {
        providerOptions: ObjectConstructor;
        center: ObjectConstructor;
        zoom: NumberConstructor;
        fitBoundsToMarkers: BooleanConstructor;
        markers: ArrayConstructor;
        polygons: ArrayConstructor;
        options: ObjectConstructor;
    };
    centerValue: Point | null;
    zoomValue: number | null;
    fitBoundsToMarkersValue: boolean;
    markersValue: Array<MarkerDefinition<MarkerOptions, InfoWindowOptions>>;
    polygonsValue: Array<PolygonDefinition<PolygonOptions, InfoWindowOptions>>;
    optionsValue: MapOptions;
    protected map: Map;
    protected markers: globalThis.Map<any, any>;
    protected infoWindows: Array<InfoWindow>;
    protected polygons: globalThis.Map<any, any>;
    connect(): void;
    protected abstract doCreateMap({ center, zoom, options, }: {
        center: Point | null;
        zoom: number | null;
        options: MapOptions;
    }): Map;
    createMarker(definition: MarkerDefinition<MarkerOptions, InfoWindowOptions>): Marker;
    protected abstract removeMarker(marker: Marker): void;
    protected abstract doCreateMarker(definition: MarkerDefinition<MarkerOptions, InfoWindowOptions>): Marker;
    createPolygon(definition: PolygonDefinition<PolygonOptions, InfoWindowOptions>): Polygon;
    protected abstract doCreatePolygon(definition: PolygonDefinition<PolygonOptions, InfoWindowOptions>): Polygon;
    protected createInfoWindow({ definition, element, }: {
        definition: MarkerDefinition<MarkerOptions, InfoWindowOptions>['infoWindow'] | PolygonDefinition<PolygonOptions, InfoWindowOptions>['infoWindow'];
        element: Marker | Polygon;
    }): InfoWindow;
    protected abstract doCreateInfoWindow({ definition, element, }: {
        definition: MarkerDefinition<MarkerOptions, InfoWindowOptions>['infoWindow'];
        element: Marker;
    } | {
        definition: PolygonDefinition<PolygonOptions, InfoWindowOptions>['infoWindow'];
        element: Polygon;
    }): InfoWindow;
    protected abstract doFitBoundsToMarkers(): void;
    protected abstract dispatchEvent(name: string, payload: Record<string, unknown>): void;
    abstract centerValueChanged(): void;
    abstract zoomValueChanged(): void;
    markersValueChanged(): void;
    polygonsValueChanged(): void;
}
